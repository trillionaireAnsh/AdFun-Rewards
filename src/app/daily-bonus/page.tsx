"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Gift, Loader2 } from 'lucide-react';

export default function DailyBonusPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [isLoading, setIsLoading] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastClaimedDate = localStorage.getItem('dailyBonusClaimed');
        if (lastClaimedDate === today) {
            setIsClaimed(true);
        }
    }, []);

    const handleClaimBonus = async () => {
        setIsLoading(true);
        // Simulate watching a rewarded ad
        await new Promise(resolve => setTimeout(resolve, 1500));

        const reward = 500; // Fixed daily bonus
        addCoins(reward);
        
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('dailyBonusClaimed', today);
        
        setIsClaimed(true);
        setIsLoading(false);
        
        toast({
            title: "Daily Bonus Claimed!",
            description: `You've received ${reward} coins. Come back tomorrow for more!`,
        });
    };

    return (
        &lt;AppLayout title="Daily Bonus"&gt;
            &lt;div className="flex justify-center"&gt;
                &lt;Card className="w-full max-w-md text-center"&gt;
                    &lt;CardHeader&gt;
                        &lt;CardTitle&gt;Claim Your Daily Bonus&lt;/CardTitle&gt;
                        &lt;CardDescription&gt;
                            {isClaimed 
                                ? "You have already claimed your bonus for today. See you tomorrow!" 
                                : "Watch a short ad to claim your daily reward."
                            }
                        &lt;/CardDescription&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="flex flex-col items-center gap-6"&gt;
                        &lt;div className="p-8 bg-primary/10 rounded-full"&gt;
                           &lt;Gift className="w-24 h-24 text-primary" /&gt;
                        &lt;/div&gt;
                        &lt;Button
                            size="lg"
                            className="w-full font-bold text-lg py-7"
                            onClick={handleClaimBonus}
                            disabled={isLoading || isClaimed}
                        &gt;
                            {isLoading && &lt;Loader2 className="mr-2 h-6 w-6 animate-spin" /&gt;}
                            {isClaimed ? 'Claimed for Today' : 'Claim 500 Coins'}
                        &lt;/Button&gt;
                    &lt;/CardContent&gt;
                &lt;/Card&gt;
            &lt;/div&gt;
        &lt;/AppLayout&gt;
    );
}
