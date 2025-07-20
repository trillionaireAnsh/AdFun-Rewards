"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCoins } from "@/context/CoinContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, DollarSign, History } from "lucide-react";

// 1 USD = 10000 coins
const CONVERSION_RATE = 10000;

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Please enter a valid amount."),
  method: z.string().min(1, "Please select a payment method."),
  details: z.string().min(5, "Please enter your payment details."),
});

type WithdrawalRequest = {
  id: string;
  amountCoins: number;
  amountUSD: number;
  method: string;
  date: string;
  status: "Pending" | "Completed" | "Failed";
};

export default function WithdrawPage() {
  const { coins, setCoins } = useCoins();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<WithdrawalRequest[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("withdrawalHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      method: "",
      details: "",
    },
  });

  const amountInCoins = form.watch("amount") * CONVERSION_RATE || 0;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (amountInCoins > coins) {
      toast({
        variant: "destructive",
        title: "Insufficient Coins",
        description: "You do not have enough coins for this withdrawal.",
      });
      setIsLoading(false);
      return;
    }

    // Simulate backend processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newRequest: WithdrawalRequest = {
      id: new Date().getTime().toString(),
      amountCoins: amountInCoins,
      amountUSD: values.amount,
      method: values.method,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };

    const updatedHistory = [newRequest, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("withdrawalHistory", JSON.stringify(updatedHistory));
    
    setCoins(prev => prev - amountInCoins);

    toast({
      title: "Withdrawal Request Submitted",
      description: `Your request for $${values.amount} is being processed.`,
    });

    form.reset();
    setIsLoading(false);
  }

  return (
    <AppLayout title="Withdraw Money">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request a Withdrawal</CardTitle>
            <CardDescription>
              10,000 coins = $1.00 USD. Minimum withdrawal is $1.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount to Withdraw (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="paytm">Paytm</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Details (Email, Phone, etc.)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your payment info" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="p-4 bg-muted rounded-md text-center font-medium">
                    You will spend: <span className="text-primary font-bold">{amountInCoins.toLocaleString()}</span> coins
                 </div>
                <Button type="submit" disabled={isLoading || amountInCoins > coins || amountInCoins <= 0} className="w-full" size="lg">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {amountInCoins > coins ? "Not Enough Coins" : "Request Withdrawal"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
                <CardDescription>Here are your recent withdrawal requests.</CardDescription>
            </CardHeader>
            <CardContent>
                {history.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-medium">${req.amountUSD.toFixed(2)}</TableCell>
                                    <TableCell>{req.method}</TableCell>
                                    <TableCell>{req.date}</TableCell>
                                    <TableCell>{req.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                        <History className="mx-auto h-12 w-12" />
                        <p className="mt-4">Your withdrawal history will appear here.</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
