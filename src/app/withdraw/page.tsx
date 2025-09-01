
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
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, orderBy, onSnapshot, Timestamp } from "firebase/firestore";

// 1000 coins = 10 INR
const CONVERSION_RATE = 100; // 1 INR = 100 coins

const formSchema = z.object({
  amount: z.coerce.number().min(10, "Minimum withdrawal is ₹10."),
  method: z.string().min(1, "Please select a payment method."),
  details: z.string().min(5, "Please enter your payment details."),
});

type WithdrawalRequest = {
  id?: string;
  userId: string;
  amountCoins: number;
  amountINR: number;
  method: string;
  details: string;
  date: Timestamp;
  status: "Pending" | "Completed" | "Failed";
};

export default function WithdrawPage() {
  const { user } = useAuth();
  const { coins, addCoins } = useCoins();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<WithdrawalRequest[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "withdrawals"), 
      where("userId", "==", user.uid), 
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requests: WithdrawalRequest[] = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() } as WithdrawalRequest);
      });
      setHistory(requests);
    });

    return () => unsubscribe();
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '' as any,
      method: "",
      details: "",
    },
  });

  const amountInCoins = Number(form.watch("amount")) * CONVERSION_RATE || 0;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
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

    try {
      const newRequest: WithdrawalRequest = {
        userId: user.uid,
        amountCoins: amountInCoins,
        amountINR: values.amount,
        method: values.method,
        details: values.details,
        date: Timestamp.now(),
        status: "Pending",
      };

      await addDoc(collection(db, "withdrawals"), newRequest);
      await addCoins(-amountInCoins);

      toast({
        title: "Withdrawal Request Submitted",
        description: `Your request for ₹${values.amount} is being processed.`,
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppLayout title="Withdraw Money">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request a Withdrawal</CardTitle>
            <CardDescription>
              1,000 coins = ₹10 INR. Minimum withdrawal is ₹10.
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
                      <FormLabel>Amount to Withdraw (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 50" {...field} onChange={(e) => field.onChange(e.target.value === '' ? '' : e.target.valueAsNumber)} />
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
                          <SelectItem value="paytm">Paytm</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
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
                      <FormLabel>Payment Details (UPI ID, Phone, etc.)</FormLabel>
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
                                    <TableCell className="font-medium">₹{req.amountINR.toFixed(2)}</TableCell>
                                    <TableCell>{req.method}</TableCell>
                                    <TableCell>{req.date.toDate().toLocaleDateString()}</TableCell>
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
