"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loader2, PlayCircle } from 'lucide-react';

const ADS_PER_DAY = 25;

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
        &lt;AppLayout title="Watch &amp; Earn"&gt;
            &lt;Card&gt;
                &lt;CardHeader&gt;
                    &lt;CardTitle&gt;Watch Videos, Earn Coins&lt;/CardTitle&gt;
                    &lt;CardDescription&gt;
                        You can watch up to {ADS_PER_DAY} ads per day. You have watched {watchedAds} ads today.
                    &lt;/CardDescription&gt;
                &lt;/CardHeader&gt;
                &lt;CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"&gt;
                    {Array.from({ length: ADS_PER_DAY }).map((_, index) => (
                        &lt;Card key={index} className="flex flex-col"&gt;
                            &lt;CardContent className="p-4 flex-1 flex flex-col items-center justify-center bg-muted/50 rounded-t-lg"&gt;
                                &lt;PlayCircle className="w-16 h-16 text-primary/50" /&gt;
                                &lt;p className="mt-2 text-sm font-semibold"&gt;Video Ad #{index + 1}&lt;/p&gt;
                            &lt;/CardContent&gt;
                            &lt;div className="p-4 border-t"&gt;
                                &lt;Button 
                                    className="w-full"
                                    onClick={() => handleWatchAd(index)}
                                    disabled={watchingAdId !== null || index &lt; watchedAds}
                                &gt;
                                    {watchingAdId === index ? (
                                        &lt;Loader2 className="mr-2 h-4 w-4 animate-spin" /&gt;
                                    ) : (
                                        index &lt; watchedAds ? 'Watched' : 'Watch Ad'
                                    )}
                                &lt;/Button&gt;
                            &lt;/div&gt;
                        &lt;/Card&gt;
                    ))}
                &lt;/CardContent&gt;
            &lt;/Card&gt;
        &lt;/AppLayout&gt;
    );
}
