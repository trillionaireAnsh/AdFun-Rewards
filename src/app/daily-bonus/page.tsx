
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Gift, Loader2 } from 'lucide-react';

const COOLDOWN_SECONDS = 30;

export default function DailyBonusPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [isLoading, setIsLoading] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastClaimedDate = localStorage.getItem('dailyBonusClaimed');
        if (lastClaimedDate === today) {
            setIsClaimed(true);
        }

        const lastClaimTime = localStorage.getItem('dailyBonusLastClaim');
        if(lastClaimTime) {
            const timePassed = (Date.now() - parseInt(lastClaimTime, 10)) / 1000;
            if(timePassed < COOLDOWN_SECONDS) {
                setCooldown(Math.ceil(COOLDOWN_SECONDS - timePassed));
            }
        }
    }, []);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown]);

    const handleClaimClick = () => {
        setIsLoading(true);
        // Simulate a short delay for feedback
        setTimeout(() => {
            handleReward();
        }, 500);
    };

    const handleReward = () => {
        const reward = 8;
        addCoins(reward);
        
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('dailyBonusClaimed', today);
        localStorage.setItem('dailyBonusLastClaim', Date.now().toString());

        setIsClaimed(true);
        setCooldown(COOLDOWN_SECONDS);
        
        toast({
            title: "Daily Bonus Claimed!",
            description: `You've received ${reward} coins. Come back tomorrow for more!`,
        });

        setIsLoading(false);
    };

    return (
        <AppLayout title="Daily Bonus">
            <div className="flex justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Claim Your Daily Bonus</CardTitle>
                        <CardDescription>
                            {isClaimed 
                                ? "You have already claimed your bonus for today. See you tomorrow!" 
                                : "Click the button below to claim your daily reward."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6">
                        <div className="p-8 bg-primary/10 rounded-full">
                           <Gift className="w-24 h-24 text-primary" />
                        </div>

                         <Button
                            size="lg"
                            className="w-full font-bold text-lg py-7"
                            disabled={isClaimed || isLoading || cooldown > 0}
                            onClick={handleClaimClick}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : isClaimed ? (
                                'Claimed for Today'
                            ) : cooldown > 0 ? (
                                `Wait ${cooldown}s`
                            ) : (
                                'Claim 8 Coins'
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
