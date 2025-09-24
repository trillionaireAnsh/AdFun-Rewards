
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Gift, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function DailyBonusPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [isLoading, setIsLoading] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastClaimedDate = localStorage.getItem('dailyBonusClaimed');
        if (lastClaimedDate === today) {
            setIsClaimed(true);
        }
    }, []);

    const handleClaimClick = () => {
        setIsLoading(true);
        // Simulate watching an ad
        setTimeout(() => {
            handleReward();
        }, 1500);
    };

    const handleReward = () => {
        const reward = 8;
        addCoins(reward);
        
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('dailyBonusClaimed', today);
        
        setIsClaimed(true);
        setIsDialogOpen(false); // Close the dialog
        
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
                                : "Watch a short ad to claim your daily reward."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6">
                        <div className="p-8 bg-primary/10 rounded-full">
                           <Gift className="w-24 h-24 text-primary" />
                        </div>

                        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <AlertDialogTrigger asChild>
                                 <Button
                                    size="lg"
                                    className="w-full font-bold text-lg py-7"
                                    disabled={isClaimed}
                                >
                                    {isClaimed ? 'Claimed for Today' : 'Claim 8 Coins'}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Watch an Ad to Earn Coins?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    To receive your daily bonus, a short video ad will play. After the ad, you'll be rewarded with 8 coins.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsLoading(false)} disabled={isLoading}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClaimClick} disabled={isLoading}>
                                     {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Watch Ad & Claim
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
