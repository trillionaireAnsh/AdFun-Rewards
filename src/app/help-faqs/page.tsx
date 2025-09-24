
"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I earn coins?",
    answer:
      "You can earn coins by completing offers from our offer walls, playing mini-games like Spin & Win, scratching daily cards, solving captchas, and referring friends.",
  },
  {
    question: "How long does it take to receive rewards after an offer?",
    answer:
      "Rewards from offer walls can take anywhere from a few minutes to a few hours to be credited to your account. This depends on the offer provider and the specific task.",
  },
  {
    question: "What is the minimum amount for withdrawal?",
    answer:
      "The minimum withdrawal amount is 5,000 coins, which is equivalent to $0.50 USD. You can request a withdrawal once you reach this threshold.",
  },
  {
    question: "How does the referral system work?",
    answer:
      "You earn a 5% lifetime commission on all coins your referred friends make. You also get bonus coins when they reach certain milestones, like their first and fifth withdrawals.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes, we take your privacy very seriously. We only collect necessary information to provide the service and do not share your personal data with third parties without your consent. Please see our Privacy Policy for more details.",
  },
];

export default function HelpFaqsPage() {
  return (
    <AppLayout title="Help & FAQs">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
