
import React, { useRef, useEffect, useState, useCallback } from 'https://esm.sh/react@18.3.1';
import { CameraIcon } from './icons/CameraIcon';

interface CameraViewProps {
  onCapture: (imageDataUrl: string) => void;
  isLoading: boolean;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, isLoading }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const setupCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access the camera. Please grant permission and refresh the page.");
    }
  }, []);

  useEffect(() => {
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCaptureClick = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      onCapture(imageDataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-700 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
            <p className="text-center text-red-400">{error}</p>
          </div>
        )}
      </div>
      <button
        onClick={handleCaptureClick}
        disabled={isLoading || !!error}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg shadow-lg transition-all duration-200 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        <CameraIcon />
        {isLoading ? 'Scanning...' : 'Scan Hand'}
      </button>
    </div>
  );
};

export default CameraView;
