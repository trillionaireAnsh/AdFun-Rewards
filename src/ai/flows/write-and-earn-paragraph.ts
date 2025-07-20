'use server';
/**
 * @fileOverview implements the WriteAndEarnParagraph flow.
 *
 * - writeAndEarnParagraph - A function that handles the paragraph submission and reward process.
 * - WriteAndEarnParagraphInput - The input type for the writeAndEarnParagraph function.
 * - WriteAndEarnParagraphOutput - The return type for the writeAndEarnParagraph function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WriteAndEarnParagraphInputSchema = z.object({
  paragraph: z.string().describe('The paragraph written by the user.'),
});
export type WriteAndEarnParagraphInput = z.infer<typeof WriteAndEarnParagraphInputSchema>;

const WriteAndEarnParagraphOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the paragraph is valid (original and meets length requirements).'),
  rewardCoins: z.number().describe('The number of coins rewarded to the user after watching an ad.'),
  reason: z.string().optional().describe('The reason for invalidation, if any.'),
});
export type WriteAndEarnParagraphOutput = z.infer<typeof WriteAndEarnParagraphOutputSchema>;

export async function writeAndEarnParagraph(input: WriteAndEarnParagraphInput): Promise<WriteAndEarnParagraphOutput> {
  return writeAndEarnParagraphFlow(input);
}

const checkParagraphPrompt = ai.definePrompt({
  name: 'checkParagraphPrompt',
  input: {schema: WriteAndEarnParagraphInputSchema},
  output: {schema: z.object({isValid: z.boolean(), reason: z.string().optional()})},
  prompt: `You are an AI assistant that checks if a given paragraph is valid for a reward system.
  A valid paragraph must meet the following criteria:
  1. The paragraph must be original and not plagiarized.
  2. The paragraph must be between 20 and 25 words.

  Evaluate the following paragraph:
  {{paragraph}}

  Return a JSON object indicating whether the paragraph is valid and, if not, the reason why.
  `,
});

const writeAndEarnParagraphFlow = ai.defineFlow(
  {
    name: 'writeAndEarnParagraphFlow',
    inputSchema: WriteAndEarnParagraphInputSchema,
    outputSchema: WriteAndEarnParagraphOutputSchema,
  },
  async input => {
    const paragraphCheckResult = await checkParagraphPrompt(input);

    if (!paragraphCheckResult.output?.isValid) {
      return {
        isValid: false,
        rewardCoins: 0,
        reason: paragraphCheckResult.output?.reason || 'Paragraph is not valid.',
      };
    }

    // Simulate ad revenue and calculate reward (50% of ad revenue converted to coins).
    // Assuming ad revenue is ₹0.50 and ₹1 = 1000 coins.
    const adRevenue = 0.50;
    const coinsPerRupee = 1000;
    const rewardPercentage = 0.50;
    const rewardCoins = Math.round(adRevenue * rewardPercentage * coinsPerRupee);

    return {
      isValid: true,
      rewardCoins: rewardCoins,
    };
  }
);
