"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { ScratchCard } from '@/components/ScratchCard';
import { Loader2 } from 'lucide-react';

const initialDailyCards = [
    { id: 1, reward: 15, isLocked: true, isScratched: false },
    { id: 2, reward: 20, isLocked: true, isScratched: false },
    { id: 3, reward: 10, isLocked: true, isScratched: false },
];

export default function ScratchCardPage() {
    const { toast } = useToast();
    const { addCoins } = useCoins();
    const [cards, setCards] = useState(initialDailyCards);
    const [unlockingCardId, setUnlockingCardId] = useState<number | null>(null);

    // Load state from local storage on mount
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const storedCards = localStorage.getItem(`scratchCardsState_${today}`);
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        } else {
            localStorage.setItem(`scratchCardsState_${today}`, JSON.stringify(initialDailyCards));
        }
    }, []);

    // Save state to local storage whenever it changes
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`scratchCardsState_${today}`, JSON.stringify(cards));
    }, [cards]);

    const handleCardClick = (cardId: number) => {
        const card = cards.find(c => c.id === cardId);
        if (!card || !card.isLocked || card.isScratched || unlockingCardId) return;

        setUnlockingCardId(cardId);
        // Simulate ad
        setTimeout(() => {
            setCards(prevCards => prevCards.map(c => c.id === cardId ? { ...c, isLocked: false } : c));
            setUnlockingCardId(null);
        }, 1500);
    };

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
                    <CardDescription>You get 3 scratch cards every day. Click one to "watch an ad" and start scratching!</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    {cards.map(card => (
                        <div key={card.id} onClick={() => handleCardClick(card.id)} className="relative">
                            <ScratchCard 
                                reward={card.reward} 
                                onScratchComplete={() => handleScratchComplete(card.id)}
                                isLocked={card.isScratched || card.isLocked}
                            />
                            {unlockingCardId === card.id && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg z-10">
                                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                                </div>
                            )}
                            {card.isScratched && (
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
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
