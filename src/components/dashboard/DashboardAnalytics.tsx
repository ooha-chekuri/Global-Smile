"use client";

import { FileText, Clock, CheckCircle, TrendUp } from "@phosphor-icons/react";

interface DashboardAnalyticsProps {
  reportsCount: number;
  latestReportDate: string | null;
  currentStage: string;
  nextAppointment: { date: string; time: string } | null;
}

export default function DashboardAnalytics({
  reportsCount,
  latestReportDate,
  currentStage,
  nextAppointment,
}: DashboardAnalyticsProps) {
  const stageProgress = {
    scan: 20,
    recommendation: 40,
    trust: 60,
    cost: 80,
    action: 100,
  };

  const progress = stageProgress[currentStage as keyof typeof stageProgress] ?? 0;

  const cards = [
    {
      icon: FileText,
      label: "Reports Generated",
      value: String(reportsCount),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: TrendUp,
      label: "Journey Progress",
      value: `${progress}%`,
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Clock,
      label: "Last Activity",
      value: latestReportDate ?? "—",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: CheckCircle,
      label: "Current Stage",
      value: currentStage.replace("-", " "),
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-3">
            <div className={`inline-flex h-10 w-10 rounded-lg items-center justify-center ${card.bg} ${card.color}`}>
              <card.icon size={20} weight="thin" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 tracking-tight capitalize">{card.value}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {nextAppointment && (
        <div className="bg-brand-cream/50 border border-brand-gold/10 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
              <Clock size={20} weight="fill" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Next Appointment</p>
              <p className="text-xs text-gray-500 font-light">
                {new Date(nextAppointment.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} at {nextAppointment.time}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full">
            Confirmed
          </span>
        </div>
      )}
    </div>
  );
}
