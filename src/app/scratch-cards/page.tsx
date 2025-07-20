"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCoins } from '@/context/CoinContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { ScratchCard } from '@/components/ScratchCard';
import { Loader2 } from 'lucide-react';

const initialDailyCards = [
    { id: 1, reward: 175, isLocked: true, isScratched: false },
    { id: 2, reward: 210, isLocked: true, isScratched: false },
    { id: 3, reward: 150, isLocked: true, isScratched: false },
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
        &lt;AppLayout title="Scratch Cards"&gt;
            &lt;Card&gt;
                &lt;CardHeader&gt;
                    &lt;CardTitle&gt;Daily Scratch Cards&lt;/CardTitle&gt;
                    &lt;CardDescription&gt;You get 3 scratch cards every day. Click one to "watch an ad" and start scratching!&lt;/CardDescription&gt;
                &lt;/CardHeader&gt;
                &lt;CardContent className="grid gap-4 md:grid-cols-3"&gt;
                    {cards.map(card => (
                        &lt;div key={card.id} onClick={() => handleCardClick(card.id)} className="relative"&gt;
                            &lt;ScratchCard 
                                reward={card.reward} 
                                onScratchComplete={() => handleScratchComplete(card.id)}
                                isLocked={card.isScratched || card.isLocked}
                            /&gt;
                            {unlockingCardId === card.id && (
                                &lt;div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg z-10"&gt;
                                    &lt;Loader2 className="h-8 w-8 animate-spin text-white" /&gt;
                                &lt;/div&gt;
                            )}
                            {card.isScratched && (
                                &lt;div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg"&gt;
                                    &lt;p className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-md"&gt;SCRATCHED&lt;/p&gt;
                                &lt;/div&gt;
                            )}
                        &lt;/div&gt;
                    ))}
                &lt;/CardContent&gt;
            &lt;/Card&gt;
        &lt;/AppLayout&gt;
    );
}
