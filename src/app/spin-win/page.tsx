"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loader2 } from 'lucide-react';
import { SpinWheel } from '@/components/SpinWheel';
import { AdPlayer } from '@/components/AdPlayer';

const segments = [25, 5, 30, 10, 15, 20, 8, 40];

export default function SpinAndWinPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [isAdPlayerOpen, setIsAdPlayerOpen] = useState(false);
    const [reward, setReward] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinsLeft, setSpinsLeft] = useState(5);

    const handleSpinClick = async () => {
        if (spinsLeft <= 0) {
            toast({ variant: 'destructive', title: "No spins left for today!" });
            return;
        }
        if (isSpinning || isAdPlayerOpen) return;

        setIsAdPlayerOpen(true);
    };

    const handleAdFinished = () => {
        const randomSegment = segments[Math.floor(Math.random() * segments.length)];
        setReward(randomSegment);
        setIsSpinning(true);
    }

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
            <AdPlayer 
                open={isAdPlayerOpen}
                onClose={() => setIsAdPlayerOpen(false)}
                onAdFinished={handleAdFinished}
                title="Watch Ad to Spin"
            />
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

                        <Button 
                            size="lg" 
                            className="w-full font-bold text-lg py-7" 
                            onClick={handleSpinClick}
                            disabled={isAdPlayerOpen || isSpinning || spinsLeft <= 0}
                        >
                            {isSpinning ? 'Spinning...' : 'SPIN NOW'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
