"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/AppLayout';
import { Copy, Gift } from 'lucide-react';

export default function ReferAndEarnPage() {
    const { toast } = useToast();
    const [referralCode, setReferralCode] = useState('ADFUN123XYZ');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralCode);
        toast({
            title: "Copied!",
            description: "Your referral code has been copied to the clipboard.",
        });
    };

    const handleApplyCode = () => {
        toast({
            title: "Code Applied!",
            description: "You and your friend have both received a bonus!",
        });
    }

    return (
        <AppLayout title="Refer & Earn">
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Invite Your Friends</CardTitle>
                        <CardDescription>Share your referral code with friends. When they sign up, you both get a bonus of 100 coins!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Your unique referral code:</p>
                        <div className="flex items-center space-x-2">
                            <Input value={referralCode} readOnly />
                            <Button variant="outline" size="icon" onClick={copyToClipboard}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full" size="lg">
                            Share Now
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
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
            </div>
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Your Referral Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                        <div >
                            <Gift className="mx-auto h-12 w-12" />
                            <p className="mt-4">Your referral rewards will appear here.</p>
                            <p className="text-sm">Start inviting friends to see your earnings grow!</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
