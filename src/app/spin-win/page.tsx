
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { SpinWheel } from '@/components/SpinWheel';
import { Loader2 } from 'lucide-react';

const segments = [5, 8, 6, 9, 7, 5, 8, 6];
const COOLDOWN_SECONDS = 30;

export default function SpinAndWinPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [reward, setReward] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinsLeft, setSpinsLeft] = useState(5);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        const lastSpinTime = localStorage.getItem('spinWinLastSpin');
        if (lastSpinTime) {
            const timePassed = (Date.now() - parseInt(lastSpinTime, 10)) / 1000;
            if (timePassed < COOLDOWN_SECONDS) {
                setCooldown(Math.ceil(COOLDOWN_SECONDS - timePassed));
            }
        }
    }, []);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown]);

    const handleSpinClick = async () => {
        if (spinsLeft <= 0) {
            toast({ variant: 'destructive', title: "No spins left for today!" });
            return;
        }
        if (isSpinning || cooldown > 0) return;

        setIsSpinning(true);
        const randomSegment = segments[Math.floor(Math.random() * segments.length)];
        setReward(randomSegment);
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
        localStorage.setItem('spinWinLastSpin', Date.now().toString());
        setCooldown(COOLDOWN_SECONDS);
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
                        <Button 
                            size="lg" 
                            className="w-full font-bold text-lg py-7" 
                            disabled={isSpinning || spinsLeft <= 0 || cooldown > 0}
                            onClick={handleSpinClick}
                        >
                            {isSpinning ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : cooldown > 0 ? (
                                `Wait ${cooldown}s`
                            ): (
                                'SPIN NOW'
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
