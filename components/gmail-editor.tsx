"use client";

import { useRef, useState } from "react";
import { GmailEmail } from "./gmail-email";
import { ImageCropper } from "./image-cropper";
import { ExportPopup } from "./export-popup";
import { Button } from "@/components/ui/button";
import { useGmailStore } from "@/lib/gmail-store";
import { Trash2 } from "lucide-react";
import { AdsOneLogo } from "./ui/logo";

export function GmailEditor() {
  const { config, updateConfig, clearAll } = useGmailStore();
  const gmailPreviewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState("");
  const [showExportPopup, setShowExportPopup] = useState(false);

  const handleProfilePictureUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setTempImageSrc(e.target.result as string);
        setCropperOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    updateConfig("profilePicture", croppedImageUrl);
  };

  const exportToPNG = async () => {
    if (!gmailPreviewRef.current) return;

    setIsExporting(true);

    try {
      // @ts-expect-error - vibe coding frfr
      const domtoimage = (await import("dom-to-image")).default;

      const blob = await domtoimage.toBlob(gmailPreviewRef.current, {
        quality: 1.0,
        bgcolor: "#ffffff",
        width: gmailPreviewRef.current.scrollWidth * 3,
        height: gmailPreviewRef.current.scrollHeight * 3,
        style: {
          transform: "scale(3)",
          transformOrigin: "top left",
          width: gmailPreviewRef.current.scrollWidth + "px",
          height: gmailPreviewRef.current.scrollHeight + "px",
        },
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gmail-email-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowExportPopup(true);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="mb-4 flex gap-2">
        <Button onClick={exportToPNG} disabled={isExporting}>
          {isExporting ? "Exporting..." : "Export as PNG"}
        </Button>
        <Button variant="outline" onClick={clearAll}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>
      <div className="flex items-center justify-center mt-4 mb-8 gap-2">
        <span className="font-semibold">By</span> <AdsOneLogo className="h-8" />
      </div>

      <div ref={gmailPreviewRef}>
        <GmailEmail
          {...config}
          onUpdate={updateConfig}
          onProfilePictureUpload={handleProfilePictureUpload}
        />
      </div>

      <ImageCropper
        isOpen={cropperOpen}
        onClose={() => setCropperOpen(false)}
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
      />

      <ExportPopup
        isOpen={showExportPopup}
        onClose={() => setShowExportPopup(false)}
      />
    </div>
  );
}
