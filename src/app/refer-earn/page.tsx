
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/AppLayout';
import { Copy, Gift, TrendingUp, Users, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReferAndEarnPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [referralCode, setReferralCode] = useState('');
    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        if (user) {
            const code = user.uid.substring(0, 8).toUpperCase();
            setReferralCode(code);
            // This assumes your app will be hosted at this domain.
            // In a real scenario, this would come from an environment variable.
            setReferralLink(`https://adfun-rewards-dl24p.web.app/login?ref=${code}`);
        }
    }, [user]);

    const copyToClipboard = () => {
        if (!referralLink) return;
        navigator.clipboard.writeText(referralLink);
        toast({
            title: "Copied!",
            description: "Your referral link has been copied to the clipboard.",
        });
    };

    const handleApplyCode = () => {
        toast({
            title: "Code Applied!",
            description: "You are now eligible for a welcome bonus!",
        });
    }

    return (
        <AppLayout title="Refer & Earn">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Your Referral Code Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users /> Invite Your Friends</CardTitle>
                        <CardDescription>Share your unique link to earn rewards from your friends' activity.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Your unique referral link:</p>
                        <div className="flex items-center space-x-2">
                             {user ? (
                                <Input value={referralLink} readOnly />
                             ) : (
                                <Skeleton className="h-10 w-full" />
                             )}
                            <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!user}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full" size="lg" disabled={!user}>
                            Share Now
                        </Button>
                    </CardFooter>
                </Card>

                {/* Lifetime Commission Card */}
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp /> Lifetime Commission</CardTitle>
                        <CardDescription>Earn a commission on all the coins your referred friends make, forever!</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-4xl font-bold text-primary">5%</p>
                        <p className="text-muted-foreground">of your friend's life time earnings</p>
                    </CardContent>
                </Card>
            </div>
            
            {/* Milestone Rewards Card */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award /> Milestone Rewards</CardTitle>
                    <CardDescription>Get bonus coins when your friends reach their withdrawal milestones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="relative flex flex-col items-center md:flex-row md:justify-between gap-8 md:gap-0">
                        {/* Connector line */}
                        <div className="absolute top-0 left-1/2 md:left-0 md:top-1/2 w-0.5 md:w-full h-full md:h-0.5 bg-border -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-0"></div>
                        
                        {/* Milestone 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                           <div className="bg-background border-2 border-primary rounded-full p-3 flex items-center justify-center h-16 w-16">
                                <p className="font-bold text-primary text-lg">+50</p>
                           </div>
                           <p className="mt-2 font-semibold">1st Withdraw</p>
                           <p className="text-xs text-muted-foreground">Friend's First Cashout</p>
                        </div>

                        {/* Milestone 2 */}
                         <div className="relative z-10 flex flex-col items-center text-center">
                           <div className="bg-background border-2 border-primary rounded-full p-3 flex items-center justify-center h-16 w-16">
                                <p className="font-bold text-primary text-lg">+100</p>
                           </div>
                           <p className="mt-2 font-semibold">5th Withdraw</p>
                           <p className="text-xs text-muted-foreground">Friend's Fifth Cashout</p>
                        </div>
                        
                        {/* Milestone 3 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                           <div className="bg-background border-2 border-primary rounded-full p-3 flex items-center justify-center h-16 w-16">
                                <p className="font-bold text-primary text-lg">+150</p>
                           </div>
                           <p className="mt-2 font-semibold">10th Withdraw</p>
                           <p className="text-xs text-muted-foreground">Friend's Tenth Cashout</p>
                        </div>
                   </div>
                </CardContent>
            </Card>

            {/* Have a code? Card */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Have a Referral Code?</CardTitle>
                    <CardDescription>Enter a friend's referral code here to get your welcome bonus.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Enter code:</p>
                    <Input placeholder="e.g. FRIENDLY456" />
                </CardContent>
                 <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleApplyCode}>
                        Apply Code
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
