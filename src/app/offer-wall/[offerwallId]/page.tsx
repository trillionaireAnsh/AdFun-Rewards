
"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import Script from 'next/script';

// This component is where you'll paste the code from your offerwall provider.
function OfferwallEmbed({ providerId, userId }: { providerId: string, userId: string | null }) {
    if (!userId) {
        return <p>Please log in to view offers.</p>;
    }

    // IMPORTANT: Replace the examples below with the actual code from your provider.
    // Each provider will have a different way of integrating.
    switch (providerId) {
        // --- EXAMPLE: AdGate Media ---
        // case 'adgatemedia':
        //     return (
        //         <>
        //             <div id="adgatemedia-wall"></div>
        //             <Script
        //                 id="adgatemedia-sdk"
        //                 strategy="afterInteractive"
        //                 src={`https://wall.adgatemedia.com/wall/YOUR_WALL_ID/${userId}`}
        //             />
        //         </>
        //     );

        // --- EXAMPLE: OfferToro ---
        // case 'offertoro':
        //     return (
        //         <iframe 
        //             src={`https://www.offertoro.com/ifr/show/YOUR_OFFER_ID/${userId}/YOUR_APP_SECRET`}
        //             className="w-full h-[80vh] border-0"
        //         />
        //     );
        
        // --- PASTE YOUR OTHER PROVIDERS' CODE HERE ---
        // case 'ayetstudios':
        //     return ( <div>Paste Ayet-Studios code here.</div> );

        // case 'adgem':
        //     return ( <div>Paste AdGem code here.</div> );

        // case 'cpxresearch':
        //     return ( <div>Paste CPX Research code here.</div> );

        // case 'wannads':
        //     return ( <div>Paste Wannads code here.</div> );

        default:
            return (
                <div className="text-center text-muted-foreground p-8">
                    <h3 className="font-bold text-lg text-foreground">Integration Required</h3>
                    <p>
                        The offer wall for <span className="font-semibold capitalize">{providerId}</span> is not configured yet.
                    </p>
                    <p className="mt-4 text-sm">
                        Please paste the provider's script or iframe into the file:
                        <br />
                        <code className="bg-muted px-2 py-1 rounded-md text-primary mt-2 inline-block">
                            src/app/offer-wall/[offerwallId]/page.tsx
                        </code>
                    </p>
                </div>
            );
    }
}

export default function OfferwallProviderPage() {
    const params = useParams();
    const { user } = useAuth();
    const offerwallId = Array.isArray(params.offerwallId) ? params.offerwallId[0] : params.offerwallId;
    const providerName = offerwallId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <AppLayout title={`${providerName} Offers`}>
            <Card>
                <CardHeader>
                    <CardTitle>Complete Offers & Earn</CardTitle>
                    <CardDescription>
                        Complete tasks from {providerName} below to earn coins. Rewards can take a few minutes to appear after completion.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full min-h-[60vh] flex justify-center items-center bg-muted rounded-lg p-2">
                        <OfferwallEmbed providerId={offerwallId} userId={user?.uid || null} />
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
