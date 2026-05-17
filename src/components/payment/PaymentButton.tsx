"use client";

import { useState, useCallback, useEffect } from "react";
import { RAZORPAY_KEY_ID } from "@/lib/razorpay";

interface PaymentButtonProps {
  amount: number;
  currency?: "INR" | "USD" | "GBP" | "AUD";
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess?: (paymentId: string, orderId: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function PaymentButton({
  amount,
  currency = "INR",
  description,
  prefill,
  onSuccess,
  onError,
  disabled,
  children,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if ((window as any).Razorpay) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handlePayment = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100,
          currency,
          notes: { description: description ?? "Consultation fee" },
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        if (order.demoMode) {
          onSuccess?.("demo_payment", "demo_order");
          return;
        }
        throw new Error(order.error ?? "Failed to create order");
      }

      const keyId = RAZORPAY_KEY_ID;
      if (!keyId) {
        onSuccess?.("demo_payment", order.id);
        return;
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Global Smile Prosthodontics",
        description: description ?? "Consultation Fee",
        order_id: order.id,
        prefill: {
          name: prefill?.name ?? "",
          email: prefill?.email ?? "",
          contact: prefill?.contact ?? "",
        },
        theme: { color: "#0d9488" },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            onSuccess?.(response.razorpay_payment_id, response.razorpay_order_id);
          } else {
            onError?.("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      onError?.((err as Error).message ?? "Payment failed");
    } finally {
      setLoading(false);
    }
  }, [amount, currency, description, prefill, onSuccess, onError]);

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading || !scriptLoaded}
      className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          Processing...
        </>
      ) : (
        children ?? "Pay Now"
      )}
    </button>
  );
}
