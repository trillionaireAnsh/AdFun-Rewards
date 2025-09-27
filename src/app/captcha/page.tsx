
"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCoins } from "@/context/CoinContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2, RefreshCw } from "lucide-react";

const formSchema = z.object({
  captcha: z.string().min(1, "Please enter the captcha."),
});

const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
};

const COOLDOWN_SECONDS = 30;

export default function CaptchaPage() {
  const { toast } = useToast();
  const { addCoins } = useCoins();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setCaptchaText(generateCaptcha());
    const lastAttemptTime = localStorage.getItem('captchaLastAttempt');
    if (lastAttemptTime) {
      const timePassed = (Date.now() - parseInt(lastAttemptTime, 10)) / 1000;
      if (timePassed < COOLDOWN_SECONDS) {
        setCooldown(Math.ceil(COOLDOWN_SECONDS - timePassed));
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      captcha: "",
    },
  });

  const handleRefresh = () => {
    setCaptchaText(generateCaptcha());
    form.reset();
  }

  const handleSuccess = () => {
    const reward = Math.floor(Math.random() * 5) + 5; // Random reward between 5-9
    addCoins(reward);
    toast({
      title: "Success!",
      description: `You've earned ${reward} coins.`,
    });
    handleRefresh();
    setIsLoading(false);
    localStorage.setItem('captchaLastAttempt', Date.now().toString());
    setCooldown(COOLDOWN_SECONDS);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (values.captcha.toLowerCase() !== captchaText.toLowerCase()) {
      toast({
        variant: "destructive",
        title: "Incorrect Captcha",
        description: "The text you entered did not match. Please try again.",
      });
      handleRefresh();
      setIsLoading(false);
      return;
    }
    
    // Simulate a short delay for feedback
    setTimeout(handleSuccess, 500);
  }

  return (
    <AppLayout title="Solve Captcha">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Solve the Captcha</CardTitle>
          <CardDescription>
            Enter the text from the image below to earn coins.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-muted px-6 py-3 rounded-md select-none tracking-[.5em] font-mono text-2xl font-bold line-through">
                {captchaText}
            </div>
            <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={cooldown > 0}>
                <RefreshCw className="h-5 w-5"/>
                <span className="sr-only">Refresh Captcha</span>
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Captcha Text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the text above"
                        {...field}
                        disabled={cooldown > 0 || isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading || cooldown > 0} size="lg" className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : cooldown > 0 ? (
                  `Wait ${cooldown}s`
                ) : (
                  "Submit and Earn"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
