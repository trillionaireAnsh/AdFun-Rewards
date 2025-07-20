"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { writeAndEarnParagraph, WriteAndEarnParagraphInput } from "@/ai/flows/write-and-earn-paragraph";
import { useCoins } from "@/context/CoinContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  paragraph: z.string().min(20, "Paragraph must be at least 20 words.").max(100, "Paragraph must be at most 100 words."),
});

export default function WriteAndEarnPage() {
  const { toast } = useToast();
  const { addCoins } = useCoins();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm&lt;z.infer&lt;typeof formSchema&gt;&gt;({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paragraph: "",
    },
  });

  async function onSubmit(values: z.infer&lt;typeof formSchema&gt;) {
    setIsLoading(true);
    try {
      toast({
          title: "Watching Ad...",
          description: "Please wait while we load a short ad.",
      });
      // Simulate watching an ad
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const input: WriteAndEarnParagraphInput = { paragraph: values.paragraph };
      const result = await writeAndEarnParagraph(input);

      if (result.isValid) {
        addCoins(result.rewardCoins);
        toast({
          title: "Congratulations!",
          description: `You've earned ${result.rewardCoins} coins for your submission.`,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission Rejected",
          description: result.reason || "Your paragraph did not meet the requirements. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    &lt;AppLayout title="Write &amp; Earn"&gt;
      &lt;Card&gt;
        &lt;CardHeader&gt;
          &lt;CardTitle&gt;Write a Paragraph&lt;/CardTitle&gt;
          &lt;CardDescription&gt;
            Write a short, original paragraph (20-100 words) on any topic. After submission and watching a short ad, you'll be rewarded with coins.
          &lt;/CardDescription&gt;
        &lt;/CardHeader&gt;
        &lt;CardContent&gt;
          &lt;Form {...form}&gt;
            &lt;form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"&gt;
              &lt;FormField
                control={form.control}
                name="paragraph"
                render={({ field }) => (
                  &lt;FormItem&gt;
                    &lt;FormLabel&gt;Your Paragraph&lt;/FormLabel&gt;
                    &lt;FormControl&gt;
                      &lt;Textarea
                        placeholder="Start writing here..."
                        className="min-h-[120px]"
                        {...field}
                      /&gt;
                    &lt;/FormControl&gt;
                    &lt;FormDescription&gt;
                      Your writing will be checked for originality and length by our AI.
                    &lt;/FormDescription&gt;
                    &lt;FormMessage /&gt;
                  &lt;/FormItem&gt;
                )}
              /&gt;
              &lt;Button type="submit" disabled={isLoading} size="lg"&gt;
                {isLoading && &lt;Loader2 className="mr-2 h-4 w-4 animate-spin" /&gt;}
                Submit and Earn
              &lt;/Button&gt;
            &lt;/form&gt;
          &lt;/Form&gt;
        &lt;/CardContent&gt;
      &lt;/Card&gt;
    &lt;/AppLayout&gt;
  );
}
