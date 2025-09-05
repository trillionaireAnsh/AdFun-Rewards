
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

export default function ScratchCardPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [cards, setCards] = useState(initialDailyCards);

    // Load state from local storage on mount
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const storedCards = localStorage.getItem(`scratchCardsState_${today}`);
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        } else {
             // Set all cards to not scratched for the new day
            const newDayCards = initialDailyCards.map(c => ({...c, isScratched: false}));
            setCards(newDayCards);
            localStorage.setItem(`scratchCardsState_${today}`, JSON.stringify(newDayCards));
        }
    }, []);

    // Save state to local storage whenever it changes
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`scratchCardsState_${today}`, JSON.stringify(cards));
    }, [cards]);


    const handleScratchComplete = (cardId: number) => {
        const card = cards.find(c => c.id === cardId);
        if (card && !card.isScratched) {
            addCoins(card.reward);
            setCards(prevCards => prevCards.map(c => c.id === cardId ? { ...c, isScratched: true } : c));
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
        </AppLayout>
    );
}
