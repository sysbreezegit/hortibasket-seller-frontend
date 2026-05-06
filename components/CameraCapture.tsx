"use client";

import React, { useRef, useState, useCallback } from "react";
import { Camera, RefreshCw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CameraCaptureProps {
  onCapture: (blob: Blob) => void;
  onClear: () => void;
  initialValue?: string;
}

export const CameraCapture = ({ onCapture, onClear, initialValue }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValue || null);
  const [isStarting, setIsStarting] = useState(false);

  const startCamera = async () => {
    if (previewUrl) return;
    setIsStarting(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      });
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera access error:", err);
      toast.error("Could not access camera. Please check permissions.");
    } finally {
      setIsStarting(false);
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            setPreviewUrl(URL.createObjectURL(blob));
            onCapture(blob);
            stopCamera();
          }
        }, "image/jpeg", 0.9);
      }
    }
  };

  const reset = () => {
    setPreviewUrl(null);
    onClear();
    startCamera();
  };

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl border border-[#00c725]/20 bg-[#0a0f09]">
      <div className="relative aspect-square bg-black overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Captured selfie" className="w-full h-full object-cover" />
        ) : stream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#00c725]/10 flex items-center justify-center">
              <Camera size={40} className="text-[#00c725]" />
            </div>
            <Button 
              onClick={startCamera} 
              disabled={isStarting}
              type="button"
              className="bg-[#00c725] text-[#0a0f09] hover:bg-[#00e02a]"
            >
              {isStarting ? "Starting..." : "Start Camera"}
            </Button>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="p-4 flex items-center justify-center gap-4">
        {previewUrl ? (
          <>
            <Button 
              variant="ghost" 
              type="button"
              onClick={reset}
              className="text-[#f2f0ea]/60 hover:text-[#f2f0ea] hover:bg-white/5"
            >
              <RefreshCw size={18} className="mr-2" /> Retake
            </Button>
            <div className="flex items-center gap-2 text-[#00c725] text-sm font-bold">
              <Check size={18} /> Captured
            </div>
          </>
        ) : stream ? (
          <Button 
            type="button"
            onClick={capturePhoto}
            className="w-full bg-[#00c725] text-[#0a0f09] hover:bg-[#00e02a] font-bold"
          >
            Capture Selfie
          </Button>
        ) : null}
      </div>
    </div>
  );
};
