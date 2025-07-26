"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        login();
        router.push('/');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <Logo className="mx-auto h-16 w-16 mb-4" />
                    <CardTitle className="text-2xl">Welcome to AdFun Rewards</CardTitle>
                    <CardDescription>
                        This is a simulated login. Click the button below to continue to the app.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleLogin} className="w-full" size="lg">
                        Login / Continue
                    </Button>
                </CardContent>
            </Card>
            <div className="absolute bottom-4 text-center">
                <p className="text-sm text-muted-foreground">by</p>
                <p className="text-xl font-semibold tracking-wider text-foreground">YADAVAS</p>
            </div>
        </div>
    );
}
