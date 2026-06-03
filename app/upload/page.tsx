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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;
      setCameraOpen(true);
      setCapturedImage("");

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
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
      <header className="absolute left-8 right-8 top-6 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm font-bold">
          <span>SKINSTRIC</span>
          <span className="text-gray-400">[ INTRO ]</span>
        </div>

        <button className="bg-black px-5 py-3 text-xs font-bold text-white">
          ENTER CODE
        </button>
      </header>

      <section className="absolute left-8 top-24">
        <h1 className="text-lg font-bold">TO START ANALYSIS</h1>
      </section>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <section className="flex min-h-screen items-center justify-center gap-[260px]">
        <button
          type="button"
          onClick={openCamera}
          className="relative h-[430px] w-[430px]"
        >
          <div className="absolute inset-8 rotate-[8deg] border-2 border-dotted border-gray-300" />
          <div className="absolute inset-14 -rotate-[14deg] border-2 border-dotted border-gray-300" />
          <div className="absolute inset-20 rotate-[20deg] border-2 border-dotted border-gray-300" />

          <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-white">
            <div className="relative h-20 w-20 rounded-full border-[6px] border-black">
              <div className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-black" />
              <div className="absolute bottom-0 left-0 h-10 w-10 bg-black [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
            </div>
          </div>

          <div className="absolute left-[250px] top-[150px] h-px w-28 rotate-[-40deg] bg-black" />

          <p className="absolute left-[300px] top-[110px] text-left text-xl">
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </p>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative h-[430px] w-[430px]"
        >
          <div className="absolute inset-8 rotate-[8deg] border-2 border-dotted border-gray-300" />
          <div className="absolute inset-14 -rotate-[14deg] border-2 border-dotted border-gray-300" />
          <div className="absolute inset-20 rotate-[20deg] border-2 border-dotted border-gray-300" />

          <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-white">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-[6px] border-black">
              <div className="absolute right-3 top-3 h-5 w-5 rounded-full bg-black" />
              <div className="absolute bottom-0 left-0 h-10 w-full rounded-t-[50%] bg-black" />
            </div>
          </div>

          <div className="absolute left-[90px] top-[260px] h-px w-28 rotate-[-40deg] bg-black" />

          <p className="absolute left-[0px] top-[285px] text-right text-xl">
            ALLOW A.I.
            <br />
            ACCESS GALLERY
          </p>
        </button>
      </section>

      <div className="absolute right-10 top-28">
        <p className="mb-2 text-xl">Preview</p>
        <div className="h-32 w-40 border border-gray-300">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <Link
        href="/thank-you"
        className="absolute bottom-10 left-8 flex items-center gap-4 font-bold"
      >
        <span className="flex h-16 w-16 rotate-45 items-center justify-center border border-black">
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
              <div className="absolute bottom-36 left-1/2 -translate-x-1/2 text-center text-sm font-bold text-white">
                <p className="mb-4">
                  TO GET BETTER RESULTS MAKE SURE TO HAVE
                </p>
                <p>
                  ◇ NEUTRAL EXPRESSION &nbsp;&nbsp;&nbsp; ◇ FRONTAL POSE
                  &nbsp;&nbsp;&nbsp; ◇ ADEQUATE LIGHTING
                </p>
              </div>

              <button
                type="button"
                onClick={takePicture}
                className="absolute right-10 top-1/2 flex items-center gap-4 text-sm font-bold text-white"
              >
                TAKE PICTURE
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-3xl">
                  📷
                </span>
              </button>
            </>
          )}

          {capturedImage && (
            <div className="absolute bottom-10 right-10 flex gap-4">
              <button
                type="button"
                onClick={retakePhoto}
                className="bg-white px-8 py-4 font-bold text-black"
              >
                RETAKE
              </button>

              <button
                type="button"
                onClick={usePhoto}
                className="bg-black px-8 py-4 font-bold text-white"
              >
                USE PHOTO
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={closeCamera}
            className="absolute bottom-10 left-8 flex items-center gap-4 font-bold text-white"
          >
            <span className="flex h-16 w-16 rotate-45 items-center justify-center border border-white">
              <span className="-rotate-45">◀</span>
            </span>
            BACK
          </button>
        </div>
      )}
    </main>
  );
}