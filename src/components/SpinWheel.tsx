"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const segmentColors = ['#FFD700', '#FF6347', '#90EE90', '#87CEEB', '#DA70D6', '#20B2AA', '#FF8C00', '#6A5ACD'];

export const SpinWheel = ({ segments, onSpinEnd, rewardAmount, isSpinning, setIsSpinning }: { segments: number[]; onSpinEnd: (coins: number) => void; rewardAmount: number, isSpinning: boolean, setIsSpinning: (spinning: boolean) => void; }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isSpinning && rewardAmount > 0) {
      const targetSegmentIndex = segments.findIndex(s => s === rewardAmount) ?? Math.floor(Math.random() * segments.length);
      const segmentAngle = 360 / segments.length;
      const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.8);
      const targetRotation = 360 - (targetSegmentIndex * segmentAngle) - (segmentAngle / 2) + randomOffset;
      
      const fullSpins = 5 * 360;
      const finalRotation = rotation + fullSpins + targetRotation;

      setRotation(finalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        onSpinEnd(rewardAmount);
      }, 5000); // Corresponds to animation duration
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning, rewardAmount]);

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
        <div className="absolute top-[10px] z-10" style={{'borderLeft': '15px solid transparent', 'borderRight': '15px solid transparent', 'borderTop': '20px solid hsl(var(--primary))'}}></div>
        <div 
            className="relative w-80 h-80 rounded-full border-8 border-primary transition-transform duration-[5000ms] ease-out-quad"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            {segments.map((segment, index) => (
                <div
                    key={index}
                    className="absolute w-1/2 h-1/2 origin-bottom-right"
                    style={{
                        transform: `rotate(${index * (360 / segments.length)}deg)`,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                    }}
                >
                    <div
                        className="absolute w-full h-full flex items-center justify-start"
                        style={{
                            transform: `rotate(${(360 / segments.length) / 2}deg)`,
                            backgroundColor: segmentColors[index % segmentColors.length],
                        }}
                    >
                         <span className="font-bold text-white -translate-x-4" style={{ transform: `translateX(50%) translateY(25%) rotate(-45deg)` }}>
                            {segment}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
