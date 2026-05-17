"use client";

import jsPDF from "jspdf";
import type { GeminiReport } from "@/types";

interface VisualizerPDFProps {
  photoUrls: string[];
  report: GeminiReport;
  patientName: string;
  concernText: string;
}

async function urlToBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
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
      doc.text(
        `Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
        pageWidth / 2,
        cursorY,
        { align: "center" },
      );
      cursorY += 14;

      // Horizontal rule
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.5);
      doc.line(margin, cursorY, pageWidth - margin, cursorY);
      cursorY += 8;

      // Photos section
      if (photoUrls.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(...darkColor);
        doc.text("Uploaded Photos", margin, cursorY);
        cursorY += 6;

        const photoY = cursorY;
        const photoWidth = 50;
        const photoHeight = 38;
        const photoGap = 6;
        const totalPhotoWidth = photoUrls.length * photoWidth + (photoUrls.length - 1) * photoGap;
        const photoStartX = (pageWidth - totalPhotoWidth) / 2;

        for (let i = 0; i < photoUrls.length; i++) {
          try {
            const imgData = await urlToBase64(photoUrls[i]);
            doc.addImage(imgData, "JPEG", photoStartX + i * (photoWidth + photoGap), photoY, photoWidth, photoHeight);
          } catch {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(8);
            doc.setTextColor(...grayColor);
            doc.text(
              "[photo unavailable]",
              photoStartX + i * (photoWidth + photoGap) + photoWidth / 2,
              photoY + photoHeight / 2,
              { align: "center" },
            );
          }
        }

        cursorY = photoY + photoHeight + 12;
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
      const valueWidth = 30;

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
      const noteEndY = cursorY + 4;
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
      if (cursorY + 30 > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }

      doc.setFillColor(...primaryColor);
      doc.roundedRect(margin, cursorY, contentWidth, 14, 4, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(245, 240, 232); // brand-cream text on teal
      doc.text("Schedule Your Specialist Consultation", pageWidth / 2, cursorY + 9, { align: "center" });
      cursorY += 24;

      // Disclaimer
      if (cursorY + 20 > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(...grayColor);
      const disclaimerY = wrapText(doc, report.disclaimer, margin, cursorY, contentWidth, 4);

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

      doc.save("global-smile-preliminary-analysis.pdf");
    } catch {
      // Silently fail
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
