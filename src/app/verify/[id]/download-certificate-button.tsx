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

function createSignatureDataUrl() {
  const canvas = document.createElement("canvas");
  canvas.width = 620;
  canvas.height = 190;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create signature image");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(8, 0);
  ctx.rotate(-0.035);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Primary ink pass for the handwritten "Uzair" body.
  ctx.strokeStyle = "rgba(11, 31, 42, 0.92)";
  ctx.lineWidth = 4.1;
  ctx.beginPath();
  // U
  ctx.moveTo(26, 88);
  ctx.bezierCurveTo(36, 138, 86, 144, 94, 92);
  ctx.bezierCurveTo(101, 66, 117, 70, 121, 92);
  ctx.bezierCurveTo(127, 142, 171, 142, 181, 96);
  // z transition
  ctx.bezierCurveTo(191, 68, 224, 67, 232, 88);
  ctx.bezierCurveTo(237, 101, 231, 116, 214, 122);
  ctx.bezierCurveTo(205, 125, 210, 132, 224, 132);
  ctx.bezierCurveTo(244, 132, 260, 122, 268, 104);
  // a
  ctx.bezierCurveTo(275, 87, 288, 79, 303, 84);
  ctx.bezierCurveTo(321, 90, 322, 111, 309, 121);
  ctx.bezierCurveTo(298, 129, 283, 127, 279, 116);
  ctx.bezierCurveTo(274, 104, 287, 95, 309, 98);
  // i stem and link
  ctx.moveTo(336, 93);
  ctx.bezierCurveTo(336, 112, 338, 127, 346, 133);
  ctx.bezierCurveTo(358, 141, 371, 128, 379, 108);
  // r + final flourish
  ctx.bezierCurveTo(387, 88, 403, 82, 417, 91);
  ctx.bezierCurveTo(431, 100, 432, 116, 423, 126);
  ctx.bezierCurveTo(454, 124, 485, 110, 510, 92);
  ctx.bezierCurveTo(525, 81, 538, 79, 547, 88);
  ctx.bezierCurveTo(552, 93, 553, 100, 549, 106);
  ctx.stroke();

  // Secondary thin pass adds pen-pressure variation and realism.
  ctx.strokeStyle = "rgba(11, 31, 42, 0.55)";
  ctx.lineWidth = 2.15;
  ctx.beginPath();
  ctx.moveTo(31, 92);
  ctx.bezierCurveTo(43, 136, 86, 140, 94, 96);
  ctx.bezierCurveTo(101, 72, 114, 74, 118, 95);
  ctx.bezierCurveTo(124, 140, 166, 140, 178, 100);
  ctx.bezierCurveTo(190, 74, 220, 73, 229, 90);
  ctx.bezierCurveTo(235, 101, 230, 113, 216, 118);
  ctx.bezierCurveTo(207, 121, 211, 127, 225, 128);
  ctx.bezierCurveTo(244, 129, 259, 121, 268, 106);
  ctx.bezierCurveTo(276, 91, 289, 83, 301, 87);
  ctx.bezierCurveTo(316, 92, 316, 109, 305, 117);
  ctx.bezierCurveTo(296, 124, 285, 123, 282, 114);
  ctx.moveTo(339, 95);
  ctx.bezierCurveTo(340, 111, 342, 124, 349, 129);
  ctx.bezierCurveTo(361, 137, 372, 124, 379, 107);
  ctx.bezierCurveTo(386, 90, 400, 86, 412, 93);
  ctx.bezierCurveTo(423, 100, 423, 113, 416, 122);
  ctx.bezierCurveTo(450, 120, 483, 106, 510, 90);
  ctx.stroke();

  // Dot on the "i".
  ctx.fillStyle = "rgba(11, 31, 42, 0.88)";
  ctx.beginPath();
  ctx.arc(334, 75, 4.2, 0, Math.PI * 2);
  ctx.fill();

  // Underline flourish to finish the signature.
  ctx.strokeStyle = "rgba(11, 31, 42, 0.8)";
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(232, 146);
  ctx.bezierCurveTo(305, 155, 410, 150, 546, 122);
  ctx.stroke();
  ctx.restore();

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
      const signatureDataUrl = createSignatureDataUrl();

      // Generate PDF in-browser and download as a file for the trainee.
      const fileBlob = await pdf(
        <CertificatePDF
          certificate={certificate}
          qrCodeDataUrl={qrCodeDataUrl}
          logoDataUrl={logoDataUrl}
          signatureDataUrl={signatureDataUrl}
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
