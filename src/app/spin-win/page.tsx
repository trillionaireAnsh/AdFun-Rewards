
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { SpinWheel } from '@/components/SpinWheel';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

const segments = [5, 8, 6, 9, 7, 5, 8, 6];

export default function SpinAndWinPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [reward, setReward] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isWatchingAd, setIsWatchingAd] = useState(false);
    const [spinsLeft, setSpinsLeft] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSpinClick = async () => {
        if (spinsLeft <= 0) {
            toast({ variant: 'destructive', title: "No spins left for today!" });
            return;
        }
        if (isSpinning || isWatchingAd) return;

        setIsWatchingAd(true);
        // Simulate watching an ad
        setTimeout(() => {
            setIsWatchingAd(false);
            setIsSpinning(true);
            setIsDialogOpen(false); // Close dialog
            const randomSegment = segments[Math.floor(Math.random() * segments.length)];
            setReward(randomSegment);
        }, 1500);
    };

    const handleSpinEnd = (coins: number) => {
        addCoins(coins);
        toast({
            title: "Congratulations!",
            description: `You won ${coins} coins!`,
            variant: 'default',
            duration: 3000,
        });
        setReward(0); // Reset for next spin
        setSpinsLeft(prev => prev - 1);
    };

    return (
        <AppLayout title="Spin & Win">
            <div className="flex flex-col items-center gap-8">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Spin the Wheel!</CardTitle>
                        <CardDescription>You have <span className="font-bold text-primary">{spinsLeft}</span> spins left today. Tap below to win big!</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6">
                        <SpinWheel 
                            segments={segments}
                            onSpinEnd={handleSpinEnd} 
                            rewardAmount={reward}
                            isSpinning={isSpinning}
                            setIsSpinning={setIsSpinning}
                         />

                        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    size="lg" 
                                    className="w-full font-bold text-lg py-7" 
                                    disabled={isSpinning || spinsLeft <= 0}
                                >
                                    {isSpinning ? 'Spinning...' : 'SPIN NOW'}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Watch an Ad to Spin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    A short video ad will play. After the ad, the wheel will spin for your reward!
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel disabled={isWatchingAd}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSpinClick} disabled={isWatchingAd}>
                                    {isWatchingAd && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Watch Ad & Spin
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
