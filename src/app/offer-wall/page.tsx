
"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import Link from "next/link";
import { Rocket } from "lucide-react";

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
    },
    {
        id: 'monlix',
        name: 'Monlix',
        description: 'A variety of offers including games, apps, and surveys.',
        logo: 'https://placehold.co/100x40/27303f/FFFFFF?text=Monlix'
    },
    {
        id: 'revu',
        name: 'Revu',
        description: 'Complete simple tasks and get rewarded instantly.',
        logo: 'https://placehold.co/100x40/367FFF/FFFFFF?text=Revu'
    }
];


export default function OfferWallPage() {

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
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {offerwalls.map((wall) => (
                        <Card key={wall.id} className="flex flex-col">
                             <Link href={`/offer-wall/${wall.id}`} className="flex flex-col flex-grow">
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
                                    <Button className="w-full">
                                        View Offers
                                    </Button>
                                </CardFooter>
                            </Link>
                        </Card>
                    ))}
                </div>
                 <Card className="mt-6 text-center flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20">
                    <Rocket className="h-12 w-12 text-primary mb-4"/>
                    <h3 className="text-xl font-bold text-primary">Promote Your App!</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">Want to feature your app or service here? Reach thousands of engaged users. Contact us for advertising opportunities.</p>
                     <Button className="mt-6">Contact Sales</Button>
                </Card>
            </div>
        </AppLayout>
    );
}
