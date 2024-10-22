"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import QRCode from "qrcode";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/Button";

export default function QRCodePage() {
  const params = useParams();
  const journeyId = params.id as string;
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [journeyLink, setJourneyLink] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (journeyId) {
      const link = `${window.location.origin}/journey/${journeyId}`;
      setJourneyLink(link);
      generateQRCode(link);
    }
  }, [journeyId]);

  const generateQRCode = async (url: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = "love_journey_qr_code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(journeyLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-pink-300 mb-6">
          Sua linha do tempo está pronta!
        </h2>
        {qrCodeUrl && (
          <div className="mb-6 flex justify-center">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          </div>
        )}
        <Button
          onClick={handleDownloadQRCode}
          label="Download QR Code"
          variant="primary"
          icon={<Download size={20} />}
        />
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={journeyLink}
            readOnly
            className="flex-grow p-[6px] bg-gray-700 text-white rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-pink-600 text-white rounded-r-lg hover:bg-pink-500 transition-colors"
          >
            {isCopied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
        <p className="text-sm text-gray-400 text-center mt-4">
          Compartilhe o link ou o código QR para que outros possam ver sua linha
          do tempo!
        </p>
      </div>
    </div>
  );
}
