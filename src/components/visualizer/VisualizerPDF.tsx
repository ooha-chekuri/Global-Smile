"use client";

import jsPDF from "jspdf";
import type { GeminiReport } from "@/types";

interface VisualizerPDFProps {
  photoUrls: string[];
  report: GeminiReport;
  patientName: string;
  concernText: string;
}

interface PdfImage {
  dataUrl: string;
  width: number;
  height: number;
}

function resolveImageUrl(url: string): string {
  if (url.startsWith("http") || url.startsWith("blob:") || url.startsWith("data:")) {
    return url;
  }

  return new URL(url, window.location.origin).toString();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image failed to load"));
    image.src = src;
  });
}

async function imageUrlToJpeg(url: string): Promise<PdfImage> {
  const source = resolveImageUrl(url);
  let objectUrl: string | null = null;

  try {
    const response = await fetch(source);
    const blob = await response.blob();
    objectUrl = URL.createObjectURL(blob);
  } catch {
    objectUrl = null;
  }

  const image = await loadImage(objectUrl ?? source);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is unavailable");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }

  return {
    dataUrl: canvas.toDataURL("image/jpeg", 0.88),
    width: canvas.width,
    height: canvas.height,
  };
}

function drawContainedImage(
  doc: jsPDF,
  image: PdfImage,
  x: number,
  y: number,
  boxWidth: number,
  boxHeight: number,
) {
  const imageRatio = image.width / image.height;
  const boxRatio = boxWidth / boxHeight;
  const drawWidth = imageRatio > boxRatio ? boxWidth : boxHeight * imageRatio;
  const drawHeight = imageRatio > boxRatio ? boxWidth / imageRatio : boxHeight;
  const drawX = x + (boxWidth - drawWidth) / 2;
  const drawY = y + (boxHeight - drawHeight) / 2;

  doc.addImage(image.dataUrl, "JPEG", drawX, drawY, drawWidth, drawHeight);
}

function ensureSpace(doc: jsPDF, cursorY: number, requiredHeight: number, margin: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (cursorY + requiredHeight <= pageHeight - margin) {
    return cursorY;
  }

  doc.addPage();
  return margin;
}

function drawPhotoPlaceholder(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(x, y, width, height, 3, 3, "FD");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text("[photo unavailable]", x + width / 2, y + height / 2, { align: "center" });
}

function drawPhotoFrame(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(x, y, width, height, 3, 3, "FD");
}

function filenameSafe(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function drawLinkButton(doc: jsPDF, label: string, url: string, x: number, y: number, width: number, height: number) {
  doc.setFillColor(13, 148, 136);
  doc.roundedRect(x, y, width, height, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(label, x + width / 2, y + 9, { align: "center" });
  doc.link(x, y, width, height, { url });
}

function drawDownloadError(message: string) {
  window.alert(message);
}

function formatReportDate() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function wrapText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const testWidth = doc.getTextWidth(testLine);

    if (testWidth > maxWidth && line) {
      doc.text(line, x, cursorY);
      cursorY += lineHeight;
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) {
    doc.text(line, x, cursorY);
    cursorY += lineHeight;
  }

  return cursorY;
}

export default function VisualizerPDF({ photoUrls, report, patientName, concernText }: VisualizerPDFProps) {
  const handleExport = async () => {
    try {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let cursorY = margin;

      const primaryColor: [number, number, number] = [45, 107, 107]; // brand-teal
      const accentColor: [number, number, number] = [201, 168, 76]; // brand-gold
      const grayColor: [number, number, number] = [122, 110, 99]; // brand-muted
      const darkColor: [number, number, number] = [26, 20, 16]; // brand-ink

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...primaryColor);
      doc.text("Global Smile", pageWidth / 2, cursorY, { align: "center" });
      cursorY += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...grayColor);
      doc.text("Specialist Preliminary Analysis", pageWidth / 2, cursorY, { align: "center" });
      cursorY += 6;
      doc.text(`Prepared for: ${patientName}`, pageWidth / 2, cursorY, { align: "center" });
      cursorY += 6;
      doc.text(`Date: ${formatReportDate()}`, pageWidth / 2, cursorY, { align: "center" });
      cursorY += 14;

      // Horizontal rule
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.5);
      doc.line(margin, cursorY, pageWidth - margin, cursorY);
      cursorY += 8;

      // Photos section
      if (photoUrls.length > 0) {
        const photos = photoUrls.slice(0, 6);
        const photoGap = 6;
        const columns = Math.min(3, photos.length);
        const photoWidth = (contentWidth - photoGap * (columns - 1)) / columns;
        const photoHeight = photoWidth * 0.75;
        const rows = Math.ceil(photos.length / columns);
        const sectionHeight = 6 + rows * photoHeight + (rows - 1) * (photoGap + 6) + 12;

        cursorY = ensureSpace(doc, cursorY, sectionHeight, margin);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(...darkColor);
        doc.text("Uploaded Photos", margin, cursorY);
        cursorY += 6;

        for (let i = 0; i < photos.length; i++) {
          const column = i % columns;
          const row = Math.floor(i / columns);
          const photoX = margin + column * (photoWidth + photoGap);
          const photoY = cursorY + row * (photoHeight + photoGap + 6);

          drawPhotoFrame(doc, photoX, photoY, photoWidth, photoHeight);
          try {
            const image = await imageUrlToJpeg(photos[i]);
            drawContainedImage(doc, image, photoX + 2, photoY + 2, photoWidth - 4, photoHeight - 4);
          } catch {
            drawPhotoPlaceholder(doc, photoX, photoY, photoWidth, photoHeight);
          }

          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(...grayColor);
          doc.text(`Photo ${i + 1}`, photoX + photoWidth / 2, photoY + photoHeight + 4, { align: "center" });
        }

        cursorY += rows * photoHeight + (rows - 1) * (photoGap + 6) + 14;
      }

      // Concern section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.text("Your Concern", margin, cursorY);
      cursorY += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);
      cursorY = wrapText(doc, concernText, margin, cursorY, contentWidth, 5);
      cursorY += 6;

      // Summary table
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.text("Analysis Summary", margin, cursorY);
      cursorY += 8;

      const tableRows: { label: string; value: string }[] = [
        { label: "Concern Category", value: report.concernCategory },
        { label: "Complexity Tier", value: report.complexityTier.charAt(0).toUpperCase() + report.complexityTier.slice(1) },
        { label: "Restoration Readiness", value: `${report.restorationScore}/10` },
      ];

      const tableX = margin + 4;
      const tableY = cursorY;
      const labelWidth = 55;

      doc.setFillColor(240, 253, 244);
      doc.roundedRect(margin, tableY - 4, contentWidth, tableRows.length * 10 + 8, 3, 3, "F");

      doc.setFont("helvetica", "medium");
      doc.setFontSize(10);
      for (let i = 0; i < tableRows.length; i++) {
        const rowY = tableY + i * 10;
        doc.setTextColor(...grayColor);
        doc.text(tableRows[i].label, tableX, rowY + 2);
        doc.setTextColor(...primaryColor);
        doc.setFont("helvetica", "bold");
        doc.text(tableRows[i].value, tableX + labelWidth, rowY + 2);
        doc.setFont("helvetica", "medium");
      }

      cursorY = tableY + tableRows.length * 10 + 12;

      // Possible treatment pathways
      if (cursorY + 50 > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.text("Possible Treatment Pathways", margin, cursorY);
      cursorY += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);

      for (const pathway of report.possiblePathways) {
        const bulletY = cursorY;
        doc.setDrawColor(...primaryColor);
        doc.setFillColor(...primaryColor);
        doc.circle(margin + 2, bulletY - 1.5, 1, "F");
        cursorY = wrapText(doc, pathway, margin + 7, cursorY, contentWidth - 7, 5);
        cursorY += 2;
      }

      cursorY += 6;

      // Educational note
      if (cursorY + 30 > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.text("Educational Note", margin, cursorY);
      cursorY += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);

      doc.setFillColor(245, 240, 232); // brand-cream
      const noteStartY = cursorY;
      doc.roundedRect(margin, noteStartY - 4, contentWidth, 30, 3, 3, "F");
      cursorY = wrapText(doc, report.educationalNote, margin + 4, cursorY, contentWidth - 8, 5);
      // Redraw rect with correct height
      doc.setFillColor(245, 240, 232); // brand-cream
      doc.roundedRect(margin, noteStartY - 4, contentWidth, cursorY - noteStartY + 8, 3, 3, "F");
      // Re-render text on top
      doc.setTextColor(...darkColor);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      wrapText(doc, report.educationalNote, margin + 4, noteStartY, contentWidth - 8, 5);
      cursorY = noteStartY + (cursorY - noteStartY) + 12;

      // CTA
      cursorY = ensureSpace(doc, cursorY, 30, margin);

      drawLinkButton(
        doc,
        "Schedule Your Specialist Consultation",
        `${window.location.origin}/teleconsultation`,
        margin,
        cursorY,
        contentWidth,
        14,
      );
      cursorY += 24;

      // Disclaimer
      if (cursorY + 20 > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(...grayColor);
      wrapText(doc, report.disclaimer, margin, cursorY, contentWidth, 4);

      // Footer
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(156, 163, 175);
      doc.text(
        "Global Smile Prosthodontics — Vijayawada, India",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" },
      );

      const patientSlug = filenameSafe(patientName) || "patient";
      doc.save(`global-smile-value-added-report-${patientSlug}.pdf`);
    } catch {
      drawDownloadError("Unable to download the PDF report. Please try again.");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download PDF Report
    </button>
  );
}
