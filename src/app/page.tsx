import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RotateCw, Gift, Users, ShieldCheck, Wallet, Star } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const ScratchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-primary"
    >
      <path d="M12.5 2.5 4 11l-2 2 2 2 7.5 8.5L16 14l2-2-2-2-1.5-1.5" />
      <path d="m18 6 2.5 2.5" />
      <path d="m14 10 1 1" />
      <path d="m7 17 1 1" />
    </svg>
  );

const features = [
  {
    title: "Spin & Win",
    description: "Try your luck on the wheel.",
    href: "/spin-win",
    icon: <RotateCw className="h-8 w-8 text-primary" />,
  },
  {
    title: "Scratch Cards",
    description: "Reveal hidden rewards.",
    href: "/scratch-cards",
    icon: <ScratchIcon />,
  },
  {
    title: "Offer Wall",
    description: "Complete offers for big rewards.",
    href: "/offer-wall",
    icon: <Star className="h-8 w-8 text-primary" />,
  },
  {
    title: "Daily Bonus",
    description: "Claim your daily bonus.",
    href: "/daily-bonus",
    icon: <Gift className="h-8 w-8 text-primary" />,
  },
  {
    title: "Solve Captcha",
    description: "Solve captchas for rewards.",
    href: "/captcha",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
  },
  {
    title: "Refer & Earn",
    description: "Invite friends and earn.",
    href: "/refer-earn",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
   {
    title: "Withdraw",
    description: "Cash out your earnings.",
    href: "/withdraw",
    icon: <Wallet className="h-8 w-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold tracking-tight text-primary">Welcome to AdFun Rewards!</h2>
                <p className="text-primary/80">
                    Choose an activity below to start earning coins today.
                </p>
            </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="group">
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="space-y-4">
            <h3 className="text-xl font-bold">Offers for you</h3>
            <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Card>
                            <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                                <Image src={`https://picsum.photos/600/400?random=${index}`} alt={`Offer ${index + 1}`} width={600} height={400} data-ai-hint="promotion offer"/>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
      </div>
    </AppLayout>
  );
}
