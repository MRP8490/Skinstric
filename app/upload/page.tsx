"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [preview, setPreview] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");

  async function sendImageToApi(image: string) {
    localStorage.setItem("skinstric-image", image);

    const response = await fetch("/api/analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    const data = await response.json();
    localStorage.setItem("skinstric-analysis", JSON.stringify(data));
    window.location.href = "/loading";
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function openCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setCameraOpen(true);
      setCapturedImage("");

      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 100);
    } catch {
      alert("Camera access was denied or unavailable.");
    }
  }

  function takePicture() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");
    setCapturedImage(image);
    setPreview(image);
    stopCamera();
  }

  async function usePhoto() {
    if (!capturedImage) return;
    await sendImageToApi(capturedImage);
  }

  function closeCamera() {
    stopCamera();
    setCameraOpen(false);
    setCapturedImage("");
  }

  async function retakePhoto() {
    setCapturedImage("");
    await openCamera();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const result = reader.result as string;
      setPreview(result);
      await sendImageToApi(result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <header className="absolute left-4 right-4 top-5 z-20 flex items-center justify-between text-[8px] font-bold md:left-8 md:right-8 md:top-6 md:text-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <span>SKINSTRIC</span>
          <span className="text-gray-400">[ INTRO ]</span>
        </div>

        <button
          type="button"
          className="bg-black px-3 py-2 text-[7px] text-white md:px-5 md:py-3 md:text-xs"
        >
          ENTER CODE
        </button>
      </header>

      <section className="absolute left-4 top-12 z-20 md:left-8 md:top-24">
        <h1 className="text-[9px] font-bold md:text-lg">TO START ANALYSIS</h1>
      </section>

      <div className="absolute right-4 top-20 z-20 md:right-10 md:top-28">
        <p className="mb-1 text-[9px] md:mb-2 md:text-xl">Preview</p>
        <div className="h-24 w-24 border border-gray-300 md:h-32 md:w-40">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <section className="flex min-h-screen flex-col items-center justify-center gap-2 pt-24 md:flex-row md:gap-[120px] md:pt-0">
        <button
          type="button"
          onClick={openCamera}
          className="relative h-[260px] w-[280px] transition-all duration-300 hover:scale-105 md:h-[484px] md:w-[521px]"
        >
          <Image
            src="/camera.svg"
            alt="Camera upload"
            width={521}
            height={484}
            className="h-full w-full object-contain"
            priority
          />
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative h-[260px] w-[280px] transition-all duration-300 hover:scale-105 md:h-[484px] md:w-[489px]"
        >
          <Image
            src="/gallery.svg"
            alt="Gallery upload"
            width={489}
            height={484}
            className="h-full w-full object-contain"
            priority
          />
        </button>
      </section>

      <Link
        href="/thank-you"
        className="absolute bottom-8 left-8 z-20 flex items-center gap-3 text-[9px] font-bold md:bottom-10 md:gap-4 md:text-base"
      >
        <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-black md:h-16 md:w-16">
          <span className="-rotate-45">◀</span>
        </span>
        BACK
      </Link>

      {cameraOpen && (
        <div className="absolute inset-0 z-50 bg-black">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="h-screen w-screen object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-screen w-screen object-cover"
            />
          )}

          {!capturedImage && (
            <>
              <div className="absolute bottom-28 left-1/2 w-[90%] -translate-x-1/2 text-center text-[9px] font-bold text-white md:bottom-36 md:text-sm">
                <p className="mb-3 md:mb-4">
                  TO GET BETTER RESULTS MAKE SURE TO HAVE
                </p>
                <p>
                  ◇ NEUTRAL EXPRESSION &nbsp; ◇ FRONTAL POSE &nbsp; ◇ ADEQUATE
                  LIGHTING
                </p>
              </div>

              <button
                type="button"
                onClick={takePicture}
                className="absolute right-4 top-1/2 flex items-center gap-3 text-[10px] font-bold text-white md:right-10 md:gap-4 md:text-sm"
              >
                TAKE PICTURE
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-2xl md:h-16 md:w-16 md:text-3xl">
                  📷
                </span>
              </button>
            </>
          )}

          {capturedImage && (
            <div className="absolute bottom-8 right-4 flex gap-3 md:bottom-10 md:right-10 md:gap-4">
              <button
                type="button"
                onClick={retakePhoto}
                className="bg-white px-5 py-3 text-[10px] font-bold text-black md:px-8 md:py-4 md:text-base"
              >
                RETAKE
              </button>

              <button
                type="button"
                onClick={usePhoto}
                className="bg-black px-5 py-3 text-[10px] font-bold text-white md:px-8 md:py-4 md:text-base"
              >
                USE PHOTO
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={closeCamera}
            className="absolute bottom-8 left-8 flex items-center gap-3 text-[9px] font-bold text-white md:bottom-10 md:gap-4 md:text-base"
          >
            <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-white md:h-16 md:w-16">
              <span className="-rotate-45">◀</span>
            </span>
            BACK
          </button>
        </div>
      )}
    </main>
  );
}