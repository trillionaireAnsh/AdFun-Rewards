"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loader2, PlayCircle } from 'lucide-react';

const ADS_PER_DAY = 50;

export default function WatchAndEarnPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [watchedAds, setWatchedAds] = useState(0);
    const [watchingAdId, setWatchingAdId] = useState<number | null>(null);

    const handleWatchAd = async (adId: number) => {
        setWatchingAdId(adId);
        // Simulate watching ad
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const reward = Math.floor(Math.random() * 100) + 200; // Random reward between 200-300
        addCoins(reward);
        setWatchedAds(prev => prev + 1);

        toast({
            title: "Ad Watched!",
            description: `You've earned ${reward} coins.`,
        });

        setWatchingAdId(null);
    };

    return (
        <AppLayout title="Watch & Earn">
            <Card>
                <CardHeader>
                    <CardTitle>Watch Videos, Earn Coins</CardTitle>
                    <CardDescription>
                        You can watch up to {ADS_PER_DAY} ads per day. You have watched {watchedAds} ads today.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: ADS_PER_DAY }).map((_, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardContent className="p-4 flex-1 flex flex-col items-center justify-center bg-muted/50 rounded-t-lg">
                                <PlayCircle className="w-16 h-16 text-primary/50" />
                                <p className="mt-2 text-sm font-semibold">Video Ad #{index + 1}</p>
                            </CardContent>
                            <div className="p-4 border-t">
                                <Button 
                                    className="w-full"
                                    onClick={() => handleWatchAd(index)}
                                    disabled={watchingAdId !== null || index < watchedAds}
                                >
                                    {watchingAdId === index ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        index < watchedAds ? 'Watched' : 'Watch Ad'
                                    )}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </AppLayout>
    );
}
