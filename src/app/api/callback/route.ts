
import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase';

// ========================================================================================
// 1. HOW TO USE THIS POSTBACK URL
// ========================================================================================
// Your postback URL for all providers is: https://<YOUR_APP_HOSTNAME>/api/callback
//
// You need to replace <YOUR_APP_HOSTNAME> with your actual website domain.
//
// Most offerwall providers will let you add dynamic parameters to the URL.
// You should configure your URL in the provider's dashboard to look like this:
//
// https://<YOUR_APP_HOSTNAME>/api/callback?provider={PROVIDER_NAME}&user_id={USER_ID}&payout={PAYOUT}&offer_id={OFFER_ID}
//
// - {USER_ID}: This is the placeholder for the user's ID.
// - {PAYOUT}: This is the placeholder for the money you receive (in USD).
// - {OFFER_ID}: This is the placeholder for the unique offer ID.
// - {PROVIDER_NAME}: You should manually set this to the provider's name (e.g., 'offertoro').
//
// The names in {curly_braces} might be different for each provider.
// Match them to what your provider uses (e.g., `[USER_ID]`, `[AMOUNT]`, etc.).
// ========================================================================================


// ========================================================================================
// 2. SECURITY - IP WHITELISTING (IMPORTANT!)
// ========================================================================================
// To prevent fraud, only allow requests from your offerwall providers' IP addresses.
// Find these IPs in their documentation and add them to the list below.
// ========================================================================================
const ALLOWED_IPS = [
  // '192.168.1.1', // Example IP for OfferToro
  // '192.168.1.2', // Example IP for AdGate Media
  // Add more provider IPs here
];

const USER_REWARD_PERCENTAGE = 0.40; // 40% of the offer payout goes to the user
const COINS_PER_DOLLAR = 10000; // 1 USD = 10,000 coins (e.g., $1 payout = 10,000 coins for you)


export async function GET(request: NextRequest) {
    const req_ip = request.ip || request.headers.get('x-forwarded-for');
    
    // SECURITY: Block requests from unauthorized IPs
    // if (process.env.NODE_ENV === 'production' && req_ip && !ALLOWED_IPS.includes(req_ip)) {
    //     console.warn(`[CALLBACK] Blocked request from unauthorized IP: ${req_ip}`);
    //     return new NextResponse('Forbidden', { status: 403 });
    // }

    const { searchParams } = new URL(request.url);

    // --- Extract parameters from the URL ---
    const userId = searchParams.get('user_id');
    const payoutStr = searchParams.get('payout');
    const offerId = searchParams.get('offer_id') || 'N/A';
    const provider = searchParams.get('provider') || 'Unknown';
    
    // --- Validate required parameters ---
    if (!userId || !payoutStr) {
        console.error('[CALLBACK] Missing user_id or payout parameter');
        return new NextResponse('Missing required parameters', { status: 400 });
    }

    const payout = parseFloat(payoutStr);
    if (isNaN(payout)) {
        console.error('[CALLBACK] Invalid payout value');
        return new NextResponse('Invalid payout value', { status: 400 });
    }

    // --- Calculate user's reward ---
    const userRewardInCoins = Math.floor(payout * USER_REWARD_PERCENTAGE * COINS_PER_DOLLAR);

    if (userRewardInCoins <= 0) {
        console.log(`[CALLBACK] Calculated reward is zero or less for payout ${payout}. Skipping.`);
        return new NextResponse('Reward too low to process', { status: 200 });
    }

    try {
        const userDocRef = adminDb.collection('users').doc(userId);
        
        // Use a transaction to safely update the user's coin balance
        await adminDb.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userDocRef);

            if (!userDoc.exists) {
                // If user doesn't exist, we can't award coins.
                // This can happen in rare cases. We just log it.
                throw new Error(`User with ID ${userId} not found.`);
            }

            // Increment the user's coin balance
            transaction.update(userDocRef, {
                coins: FieldValue.increment(userRewardInCoins)
            });

            // Log the transaction for your records
            const historyRef = adminDb.collection('offer_history').doc();
            transaction.set(historyRef, {
                userId,
                offerId,
                provider,
                payout,
                coinsAwarded: userRewardInCoins,
                timestamp: FieldValue.serverTimestamp()
            });
        });

        console.log(`[CALLBACK] Success: Awarded ${userRewardInCoins} coins to user ${userId} for offer ${offerId} from ${provider}.`);

        // --- Respond to the offerwall provider ---
        // Most providers expect a '1' or 'OK' to confirm the postback was received.
        return new NextResponse('1', { status: 200, headers: { 'Content-Type': 'text/plain' } });

    } catch (error) {
        console.error(`[CALLBACK] Error processing callback for user ${userId}:`, error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
