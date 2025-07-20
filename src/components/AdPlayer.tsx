"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Loader2, X, VolumeX } from "lucide-react";

interface AdPlayerProps {
  open: boolean;
  onAdFinished: () => void;
  onClose: () => void;
  title?: string;
}

export function AdPlayer({
  open,
  onAdFinished,
  onClose,
  title = "Rewarded Ad",
}: AdPlayerProps) {
  const [adState, setAdState] = useState<"loading" | "playing" | "finished">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      setAdState("loading");
      setProgress(0);
      
      // Simulate ad loading time
      timer = setTimeout(() => {
        setAdState("playing");
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    if (adState === "playing") {
      const adDuration = 5000; // 5 seconds
      let startTime = Date.now();

      const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / adDuration) * 100, 100);
        setProgress(newProgress);
        if (newProgress < 100) {
          progressTimer = setTimeout(updateProgress, 50);
        } else {
          setAdState("finished");
        }
      };
      
      progressTimer = setTimeout(updateProgress, 50);
    }
    return () => clearTimeout(progressTimer);
  }, [adState]);

  const handleClaim = () => {
    onAdFinished();
    onClose();
  };

  const handleDialogClose = () => {
    if (adState !== 'finished') {
        return; // Prevent closing while ad is playing
    }
    onClose();
  }

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
      <AlertDialogContent className="p-0 border-0 max-w-md w-full gap-0">
        <div className="aspect-video bg-black flex items-center justify-center relative">
          {adState === "loading" && (
            <div className="text-white flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p>Loading ad...</p>
            </div>
          )}
          {adState === 'playing' && (
             <p className="text-white text-2xl font-bold">Your Ad Here</p>
          )}
           {adState === 'finished' && (
             <p className="text-white text-2xl font-bold">Reward Granted!</p>
          )}

          {adState !== 'loading' && (
            <>
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                {Math.round(progress)}%
              </div>
              <button onClick={handleDialogClose} disabled={adState !== 'finished'} className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white disabled:opacity-50">
                <X className="w-5 h-5"/>
              </button>
               <button className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded-full text-white">
                <VolumeX className="w-5 h-5"/>
              </button>
              <Progress value={progress} className="absolute bottom-0 h-1 rounded-none" />
            </>
          )}
        </div>
        <AlertDialogHeader className="p-4">
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="p-4 pt-0">
          <AlertDialogAction
            onClick={handleClaim}
            disabled={adState !== "finished"}
            className="w-full"
          >
            {adState === "finished" ? "Claim Reward" : "Please wait..."}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
