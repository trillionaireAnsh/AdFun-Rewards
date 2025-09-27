
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
const MAX_SPINS_PER_DAY = 5;

export default function SpinAndWinPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [reward, setReward] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinsLeft, setSpinsLeft] = useState(MAX_SPINS_PER_DAY);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const storedState = localStorage.getItem('spinWinState');

        if (storedState) {
            const { date, spins } = JSON.parse(storedState);
            if (date === today) {
                setSpinsLeft(spins);
            } else {
                // New day, reset spins
                setSpinsLeft(MAX_SPINS_PER_DAY);
                localStorage.setItem('spinWinState', JSON.stringify({ date: today, spins: MAX_SPINS_PER_DAY }));
            }
        } else {
             // No state stored, initialize for today
            localStorage.setItem('spinWinState', JSON.stringify({ date: today, spins: MAX_SPINS_PER_DAY }));
        }

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
        
        const newSpinsLeft = spinsLeft - 1;
        setSpinsLeft(newSpinsLeft);
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('spinWinState', JSON.stringify({ date: today, spins: newSpinsLeft }));
        localStorage.setItem('spinWinLastSpin', Date.now().toString());

        setCooldown(COOLDOWN_SECONDS);
    };

    // This effect should run after the spin has ended and state is updated.
    useEffect(() => {
        if (!isSpinning && reward === 0) {
            // This condition is met after a spin completes and state is reset.
        }
    }, [isSpinning, reward]);


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
                            ) : spinsLeft <= 0 ? (
                                'No Spins Left'
                            ) : (
                                'SPIN NOW'
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
