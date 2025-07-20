"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loader2 } from 'lucide-react';
import { SpinWheel } from '@/components/SpinWheel';

export default function SpinAndWinPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [isAdPlaying, setIsAdPlaying] = useState(false);
    const [reward, setReward] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinsLeft, setSpinsLeft] = useState(5);

    const handleSpinClick = async () => {
        if (spinsLeft <= 0) {
            toast({ variant: 'destructive', title: "No spins left for today!" });
            return;
        }
        if (isSpinning || isAdPlaying) return;

        setIsAdPlaying(true);
        // Simulate watching an ad
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsAdPlaying(false);
        
        // Simulate getting reward from ad revenue. 50% of 0.5 = 0.25 -> 250 coins
        // The wheel has segments: [250, 50, 300, 100, 150, 200, 75, 400]
        // Let's pick 250 as the "fixed" reward
        const calculatedReward = 250; 
        setReward(calculatedReward);
        setIsSpinning(true);
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
                            onSpinEnd={handleSpinEnd} 
                            rewardAmount={reward}
                            isSpinning={isSpinning}
                            setIsSpinning={setIsSpinning}
                         />

                        <Button 
                            size="lg" 
                            className="w-full font-bold text-lg py-7" 
                            onClick={handleSpinClick}
                            disabled={isAdPlaying || isSpinning || spinsLeft <= 0}
                        >
                            {isAdPlaying ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
                            {isAdPlaying ? 'Loading Ad...' : isSpinning ? 'Spinning...' : 'SPIN NOW'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
