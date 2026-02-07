"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import CertificatePDF from "@/components/CertificatePDF";
import type { CertificateRecord } from "@/lib/certificate-data";

type DownloadCertificateButtonProps = {
  certificate: CertificateRecord;
};

function createCertificateFileName(certificate: CertificateRecord) {
  const safeName = certificate.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${certificate.id}-${safeName}.pdf`;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function createLogoDataUrl() {
  const canvas = document.createElement("canvas");
  canvas.width = 1120;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create certificate logo");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const brandGradient = ctx.createLinearGradient(0, 0, 250, 250);
  brandGradient.addColorStop(0, "#ff6b35");
  brandGradient.addColorStop(0.55, "#ff915c");
  brandGradient.addColorStop(1, "#e45521");
  ctx.fillStyle = brandGradient;
  drawRoundedRect(ctx, 0, 0, 250, 250, 34);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(56, 190);
  ctx.lineTo(125, 44);
  ctx.lineTo(194, 190);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(125, 44);
  ctx.lineTo(125, 140);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 118);
  ctx.lineTo(125, 140);
  ctx.lineTo(150, 118);
  ctx.stroke();

  ctx.fillStyle = "#0b1f2a";
  ctx.font = "700 98px Georgia";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Adventise", 305, 128);

  ctx.fillStyle = "#5d6b74";
  ctx.font = "500 44px Georgia";
  ctx.fillText("adventise.com", 307, 194);

  return canvas.toDataURL("image/png");
}

export default function DownloadCertificateButton({
  certificate,
}: DownloadCertificateButtonProps) {
  const [isPreparing, setIsPreparing] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  async function handleDownload() {
    if (isPreparing) {
      return;
    }

    setIsPreparing(true);
    setDownloadError("");

    try {
      const verificationUrl = `https://adventise.com/verify/${encodeURIComponent(certificate.id)}`;

      // QR connects the PDF directly with the public verification endpoint.
      const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
        width: 240,
        margin: 1,
        errorCorrectionLevel: "M",
        color: {
          dark: "#111827",
          light: "#FFFFFF",
        },
      });

      // Render a PNG logo so it consistently appears inside @react-pdf/renderer.
      const logoDataUrl = createLogoDataUrl();

      // Generate PDF in-browser and download as a file for the trainee.
      const fileBlob = await pdf(
        <CertificatePDF
          certificate={certificate}
          qrCodeDataUrl={qrCodeDataUrl}
          logoDataUrl={logoDataUrl}
        />
      ).toBlob();

      const fileUrl = URL.createObjectURL(fileBlob);
      const anchor = document.createElement("a");
      anchor.href = fileUrl;
      anchor.download = createCertificateFileName(certificate);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(fileUrl);
    } catch {
      setDownloadError("Certificate could not be prepared. Please try again.");
    } finally {
      setIsPreparing(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isPreparing}
        className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPreparing ? "Preparing certificate\u2026" : "Download Certificate (PDF)"}
      </button>
      {downloadError ? <p className="text-sm text-ink-2">{downloadError}</p> : null}
    </div>
  );
}
