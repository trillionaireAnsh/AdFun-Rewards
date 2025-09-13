"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useCoins } from "@/context/CoinContext";
import { useToast } from "@/hooks/use-toast";
import { Download, Gamepad2, HandCoins } from "lucide-react";

// 1000 coins = ₹10 INR, so 100 coins = ₹1 INR
const COINS_PER_RUPEE = 100;
const USER_REWARD_PERCENTAGE = 0.40; // 40%

const offers = [
    {
        id: 1,
        title: "Install & Play 'Epic Raiders'",
        description: "Reach level 10 to get your reward.",
        offerValue: 40, // in INR
        icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    },
    {
        id: 2,
        title: "Download 'ShopSmart' App",
        description: "Sign up and make your first purchase.",
        offerValue: 50, // in INR
        icon: <Download className="h-8 w-8 text-primary" />,
    },
    {
        id: 3,
        title: "Complete a Survey",
        description: "Share your opinion on consumer products.",
        offerValue: 100, // in INR
        icon: <HandCoins className="h-8 w-8 text-primary" />,
    },
    {
        id: 4,
        title: "Play 'Puzzle Mania'",
        description: "Complete 25 puzzles to earn coins.",
        offerValue: 30, // in INR
        icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    }
];

const calculateReward = (offerValue: number) => {
    const userRewardINR = offerValue * USER_REWARD_PERCENTAGE;
    const coinReward = Math.floor(userRewardINR * COINS_PER_RUPEE);
    return coinReward;
}


export default function OfferWallPage() {
    const { addCoins } = useCoins();
    const { toast } = useToast();

    const handleOfferComplete = (reward: number) => {
        addCoins(reward);
        toast({
            title: "Offer Completed!",
            description: `You have been rewarded with ${reward} coins.`,
        });
    };

    return (
        <AppLayout title="Offer Wall">
            <div className="space-y-6">
                 <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle>Complete Offers, Earn Big!</CardTitle>
                        <CardDescription>
                            Complete offers from our partners to earn coins. Your reward is 40% of the offer's value. 
                            This is a simulation; clicking 'Start Offer' will instantly grant the reward.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer) => {
                        const reward = calculateReward(offer.offerValue);
                        return (
                        <Card key={offer.id}>
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                {offer.icon}
                                <div>
                                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                                    <CardDescription>{offer.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary text-center">
                                    + {reward.toLocaleString()} Coins
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-1">(Offer Value: ₹{offer.offerValue})</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleOfferComplete(reward)}>
                                    Start Offer
                                </Button>
                            </CardFooter>
                        </Card>
                    )})}
                </div>
                 <div className="mt-6 flex justify-center">
                    <div className="w-full h-24 bg-muted flex items-center justify-center rounded-lg">
                        <p className="text-muted-foreground">Offer Wall Ad Placeholder</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
