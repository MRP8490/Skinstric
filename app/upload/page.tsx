"use client";

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

      <section className="flex min-h-screen flex-col items-center justify-center gap-2 pt-24 md:flex-row md:gap-[260px] md:pt-0">
        <button
          type="button"
          onClick={openCamera}
          className="relative h-[210px] w-[210px] transition-all duration-300 hover:scale-105 md:h-[430px] md:w-[430px]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-6 animate-upload-square border border-dotted border-gray-400 opacity-40 md:inset-8"
              style={{ "--start-rotate": "8deg" } as React.CSSProperties}
            />
            <div
              className="absolute inset-10 animate-upload-square border border-dotted border-gray-400 opacity-40 md:inset-14"
              style={{ "--start-rotate": "-14deg" } as React.CSSProperties}
            />
            <div
              className="absolute inset-14 animate-upload-square border border-dotted border-gray-400 opacity-40 md:inset-20"
              style={{ "--start-rotate": "20deg" } as React.CSSProperties}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white md:h-36 md:w-36 md:border-2">
            <div className="relative h-11 w-11 rounded-full border-[4px] border-black md:h-20 md:w-20 md:border-[6px]">
              <div className="absolute inset-0 m-auto h-5 w-5 rounded-full bg-black md:h-8 md:w-8" />
              <div className="absolute bottom-0 left-0 h-6 w-6 bg-black [clip-path:polygon(0_100%,100%_0,100%_100%)] md:h-10 md:w-10" />
            </div>
          </div>

          <div className="absolute left-[128px] top-[76px] h-px w-14 rotate-[-40deg] bg-black md:left-[250px] md:top-[150px] md:w-28" />

          <p className="absolute left-[148px] top-[55px] text-left text-[9px] md:left-[300px] md:top-[110px] md:text-xl">
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </p>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative h-[210px] w-[210px] transition-all duration-300 hover:scale-105 md:h-[430px] md:w-[430px]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-6 animate-upload-square border border-dotted border-gray-400 opacity-40 md:inset-8"
              style={{ "--start-rotate": "8deg" } as React.CSSProperties}
            />
            <div
              className="absolute inset-10 animate-upload-square border border-dotted border-gray-400 opacity-40 md:inset-14"
              style={{ "--start-rotate": "-14deg" } as React.CSSProperties}
            />
            <div
              className="absolute inset-14 animate-upload-square border border-dotted border-gray-400 opacity-40 md:inset-20"
              style={{ "--start-rotate": "20deg" } as React.CSSProperties}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white md:h-36 md:w-36 md:border-2">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-[4px] border-black md:h-20 md:w-20 md:border-[6px]">
              <div className="absolute right-2 top-2 h-3 w-3 rounded-full bg-black md:right-3 md:top-3 md:h-5 md:w-5" />
              <div className="absolute bottom-0 left-0 h-6 w-full rounded-t-[50%] bg-black md:h-10" />
            </div>
          </div>

          <div className="absolute left-[58px] top-[135px] h-px w-14 rotate-[-40deg] bg-black md:left-[90px] md:top-[260px] md:w-28" />

          <p className="absolute left-[5px] top-[148px] text-right text-[9px] md:left-0 md:top-[285px] md:text-xl">
            ALLOW A.I.
            <br />
            ACCESS GALLERY
          </p>
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