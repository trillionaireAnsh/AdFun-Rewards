"use client";

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

interface ScratchCardProps {
  reward: number;
  onScratchComplete: () => void;
  isScratched: boolean;
}

export function ScratchCard({ reward, onScratchComplete, isScratched }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isRevealed || isScratched) return;

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
      if (!ctx || !canvas.width || !canvas.height) return 0;
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
      e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
      const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, true);
      ctx.fill();
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => { 
        e.preventDefault();
        isDrawing = true; 
    };
    const stopDrawing = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
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
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', scratch, { passive: false });

    return () => {
        if(canvas){
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mousemove', scratch);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchend', stopDrawing);
            canvas.removeEventListener('touchmove', scratch);
        }
    };
  }, [isRevealed, onScratchComplete, isScratched]);

  return (
    <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-yellow-300 to-orange-400">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <Gift size={48} />
        <p className="text-sm">You won</p>
        <p className="text-4xl font-bold">{reward}</p>
        <p className="text-sm">coins</p>
      </div>
      
      {!isRevealed && !isScratched && (
        <canvas
          ref={canvasRef}
          className={cn('absolute inset-0 w-full h-full cursor-grab z-10')}
        />
      )}
    </div>
  );
}
