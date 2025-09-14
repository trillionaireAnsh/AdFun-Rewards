"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from 'next/image';

const offerwalls = [
    {
        id: 'adgatemedia',
        name: 'AdGate Media',
        description: 'Complete tasks, watch videos, and try new apps.',
        logo: 'https://placehold.co/100x40/000000/FFFFFF?text=AdGate'
    },
    {
        id: 'offertoro',
        name: 'OfferToro',
        description: 'A wide variety of mobile and desktop offers.',
        logo: 'https://placehold.co/100x40/1A84C8/FFFFFF?text=OfferToro'
    },
    {
        id: 'ayetstudios',
        name: 'Ayet-Studios',
        description: 'Discover new games and apps to earn rewards.',
        logo: 'https://placehold.co/100x40/FF5722/FFFFFF?text=Ayet'
    },
    {
        id: 'adgem',
        name: 'AdGem',
        description: 'Engage with top brands and earn.',
        logo: 'https://placehold.co/100x40/00C482/FFFFFF?text=AdGem'
    },
    {
        id: 'cpxresearch',
        name: 'CPX Research',
        description: 'Share your opinion and earn with paid surveys.',
        logo: 'https://placehold.co/100x40/FBC02D/000000?text=CPX'
    },
    {
        id: 'wannads',
        name: 'Wannads',
        description: 'Play games, take surveys and get rewarded.',
        logo: 'https://placehold.co/100x40/8E44AD/FFFFFF?text=Wannads'
    }
];


export default function OfferWallPage() {

    const handleViewOffers = (offerwallName: string) => {
        // In a real application, this would trigger the specific provider's SDK
        // to show the offerwall, often in an iframe or webview.
        alert(`Showing offers from ${offerwallName}. Integration required.`);
    }

    return (
        <AppLayout title="Offer Walls">
            <div className="space-y-6">
                 <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle>Choose an Offer Wall</CardTitle>
                        <CardDescription>
                           Select an offer provider from the list below. Each provider has a unique set of tasks, surveys, and app installs for you to complete and earn coins.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {offerwalls.map((wall) => (
                        <Card key={wall.id} className="flex flex-col">
                            <CardHeader>
                               <div className="flex justify-center mb-4">
                                     <Image src={wall.logo} alt={`${wall.name} logo`} width={120} height={50} className="rounded-md" data-ai-hint="logo company"/>
                               </div>
                                <CardTitle className="text-center">{wall.name}</CardTitle>
                                <CardDescription className="text-center min-h-[40px]">{wall.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                {/* Content can be added here if needed */}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleViewOffers(wall.name)}>
                                    View Offers
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
