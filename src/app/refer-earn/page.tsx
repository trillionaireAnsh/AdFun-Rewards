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
        &lt;AppLayout title="Refer &amp; Earn"&gt;
            &lt;div className="grid gap-8 md:grid-cols-2"&gt;
                &lt;Card&gt;
                    &lt;CardHeader&gt;
                        &lt;CardTitle&gt;Invite Your Friends&lt;/CardTitle&gt;
                        &lt;CardDescription&gt;Share your referral code with friends. When they sign up, you both get a bonus of 1000 coins!&lt;/CardDescription&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-4"&gt;
                        &lt;p className="text-sm text-muted-foreground"&gt;Your unique referral code:&lt;/p&gt;
                        &lt;div className="flex items-center space-x-2"&gt;
                            &lt;Input value={referralCode} readOnly /&gt;
                            &lt;Button variant="outline" size="icon" onClick={copyToClipboard}&gt;
                                &lt;Copy className="h-4 w-4" /&gt;
                            &lt;/Button&gt;
                        &lt;/div&gt;
                    &lt;/CardContent&gt;
                    &lt;CardFooter&gt;
                         &lt;Button className="w-full" size="lg"&gt;
                            Share Now
                        &lt;/Button&gt;
                    &lt;/CardFooter&gt;
                &lt;/Card&gt;
                &lt;Card&gt;
                    &lt;CardHeader&gt;
                        &lt;CardTitle&gt;Have a Referral Code?&lt;/CardTitle&gt;
                        &lt;CardDescription&gt;Enter a friend's referral code here to get your welcome bonus.&lt;/CardDescription&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-4"&gt;
                        &lt;p className="text-sm text-muted-foreground"&gt;Enter code:&lt;/p&gt;
                        &lt;Input placeholder="e.g. FRIENDLY456" /&gt;
                    &lt;/CardContent&gt;
                     &lt;CardFooter&gt;
                        &lt;Button className="w-full" size="lg" onClick={handleApplyCode}&gt;
                            Apply Code
                        &lt;/Button&gt;
                    &lt;/CardFooter&gt;
                &lt;/Card&gt;
            &lt;/div&gt;
            &lt;Card className="mt-8"&gt;
                &lt;CardHeader&gt;
                    &lt;CardTitle&gt;Your Referral Rewards&lt;/CardTitle&gt;
                &lt;/CardHeader&gt;
                &lt;CardContent&gt;
                    &lt;div className="flex items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg"&gt;
                        &lt;div &gt;
                            &lt;Gift className="mx-auto h-12 w-12" /&gt;
                            &lt;p className="mt-4"&gt;Your referral rewards will appear here.&lt;/p&gt;
                            &lt;p className="text-sm"&gt;Start inviting friends to see your earnings grow!&lt;/p&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/CardContent&gt;
            &lt;/Card&gt;
        &lt;/AppLayout&gt;
    );
}
