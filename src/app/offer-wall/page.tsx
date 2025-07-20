"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useCoins } from "@/context/CoinContext";
import { useToast } from "@/hooks/use-toast";
import { Download, Gamepad2, HandCoins } from "lucide-react";

const offers = [
    {
        id: 1,
        title: "Install & Play 'Epic Raiders'",
        description: "Reach level 10 to get your reward.",
        reward: 5000,
        icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    },
    {
        id: 2,
        title: "Download 'ShopSmart' App",
        description: "Sign up and make your first purchase.",
        reward: 7500,
        icon: <Download className="h-8 w-8 text-primary" />,
    },
    {
        id: 3,
        title: "Complete a Survey",
        description: "Share your opinion on consumer products.",
        reward: 2000,
        icon: <HandCoins className="h-8 w-8 text-primary" />,
    },
    {
        id: 4,
        title: "Play 'Puzzle Mania'",
        description: "Complete 25 puzzles to earn coins.",
        reward: 4000,
        icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    }
];

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
                            Here you can find special offers from our partners. Complete them to earn a large number of coins.
                            This is just a simulated Offer Wall. Clicking 'Complete' will instantly grant the reward.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer) => (
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
                                    + {offer.reward.toLocaleString()} Coins
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleOfferComplete(offer.reward)}>
                                    Start Offer
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
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
