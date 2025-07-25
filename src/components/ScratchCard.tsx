"use client";

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Gift, Lock } from 'lucide-react';

interface ScratchCardProps {
  reward: number;
  onScratchComplete: () => void;
  isLocked: boolean;
  isScratched: boolean;
}

export function ScratchCard({ reward, onScratchComplete, isLocked, isScratched }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isLocked || isRevealed || isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set a timeout to ensure the canvas has dimensions before drawing
    setTimeout(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      ctx.fillStyle = '#cccccc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = 'bold 24px Poppins';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);
    }, 0);


    let isDrawing = false;

    const getScratchPercentage = () => {
      if (!ctx) return 0;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }
      return (transparentPixels / (canvas.width * canvas.height)) * 100;
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || !ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
      const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, true);
      ctx.fill();
    };

    const startDrawing = () => { isDrawing = true; };
    const stopDrawing = () => {
        isDrawing = false;
        if (getScratchPercentage() > 50) {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            setIsRevealed(true);
            onScratchComplete();
        }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchstart', startDrawing, { passive: true });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', scratch, { passive: true });

    return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mousemove', scratch);
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchend', stopDrawing);
        canvas.removeEventListener('touchmove', scratch);
    };
  }, [isLocked, isRevealed, onScratchComplete, isScratched]);

  return (
    <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-yellow-300 to-orange-400">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <Gift size={48} />
        <p className="text-sm">You won</p>
        <p className="text-4xl font-bold">{reward}</p>
        <p className="text-sm">coins</p>
      </div>
      
      {!isRevealed && !isScratched && (
        <>
          {!isLocked ? (
            <canvas
              ref={canvasRef}
              className={cn('absolute inset-0 w-full h-full cursor-grab')}
            />
          ) : (
             <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white cursor-pointer z-10">
                <Lock size={32} />
                <p className="mt-2 font-semibold">Click to unlock</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
