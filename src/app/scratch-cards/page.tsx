
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { ScratchCard } from '@/components/ScratchCard';

const initialDailyCards = [
    { id: 1, reward: 5, isScratched: false },
    { id: 2, reward: 8, isScratched: false },
    { id: 3, reward: 6, isScratched: false },
];

const COOLDOWN_SECONDS = 30;

export default function ScratchCardPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [cards, setCards] = useState(initialDailyCards);
    const [cooldown, setCooldown] = useState(0);

    // Load state from local storage on mount
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const storedState = localStorage.getItem('scratchCardState');
        
        if (storedState) {
            const { date, cards: storedCards } = JSON.parse(storedState);
            if (date === today) {
                setCards(storedCards);
            } else {
                // New day, reset the cards
                const newDayCards = initialDailyCards.map(c => ({...c, isScratched: false}));
                setCards(newDayCards);
                localStorage.setItem('scratchCardState', JSON.stringify({ date: today, cards: newDayCards }));
            }
        } else {
            // No state stored, initialize for today
            localStorage.setItem('scratchCardState', JSON.stringify({ date: today, cards: initialDailyCards }));
        }

        const lastScratchTime = localStorage.getItem('scratchCardLastScratch');
        if (lastScratchTime) {
            const timePassed = (Date.now() - parseInt(lastScratchTime, 10)) / 1000;
            if (timePassed < COOLDOWN_SECONDS) {
                setCooldown(Math.ceil(COOLDOWN_SECONDS - timePassed));
            }
        }
    }, []);

    // Save state to local storage whenever it changes
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('scratchCardState', JSON.stringify({ date: today, cards: cards }));
    }, [cards]);

    useEffect(() => {
        if (cooldown > 0) {
          const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
          }, 1000);
          return () => clearInterval(timer);
        }
      }, [cooldown]);

    const handleScratchComplete = (cardId: number) => {
        if (cooldown > 0) {
            toast({
                variant: 'destructive',
                title: 'Please wait',
                description: `You can scratch another card in ${cooldown} seconds.`,
            });
            return;
        }

        const card = cards.find(c => c.id === cardId);
        if (card && !card.isScratched) {
            addCoins(card.reward);
            setCards(prevCards => prevCards.map(c => c.id === cardId ? { ...c, isScratched: true } : c));
            
            localStorage.setItem('scratchCardLastScratch', Date.now().toString());
            setCooldown(COOLDOWN_SECONDS);

            toast({
                title: "Congratulations!",
                description: `You won ${card.reward} coins!`,
            });
        }
    };

    return (
        <AppLayout title="Scratch Cards">
            <Card>
                <CardHeader>
                    <CardTitle>Daily Scratch Cards</CardTitle>
                    <CardDescription>You get 3 scratch cards every day. Scratch them to reveal your reward!</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    {cards.map(card => (
                        <div key={card.id} className="relative">
                            <ScratchCard 
                                reward={card.reward} 
                                onScratchComplete={() => handleScratchComplete(card.id)}
                                isScratched={card.isScratched}
                            />
                            {card.isScratched && (
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg z-20">
                                    <p className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-md">SCRATCHED</p>
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
            {cooldown > 0 && (
                <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg">
                    Next scratch in: {cooldown}s
                </div>
            )}
        </AppLayout>
    );
}
