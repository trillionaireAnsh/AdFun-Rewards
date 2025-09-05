
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

    const handleClaimClick = () => {
        setIsLoading(true);
        // Simulate a short delay for feedback
        setTimeout(handleReward, 500);
    };

    const handleReward = () => {
        const reward = 20;
        addCoins(reward);
        
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('dailyBonusClaimed', today);
        
        setIsClaimed(true);
        
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
                            onClick={handleClaimClick}
                            disabled={isLoading || isClaimed}
                        >
                            {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
                            {isClaimed ? 'Claimed for Today' : 'Claim 20 Coins'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
