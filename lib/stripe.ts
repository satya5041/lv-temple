import Stripe from "stripe"

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

// Preset donation amounts in cents
export const DONATION_PRESETS = [51, 108, 251, 501, 1001, 2501]

export async function createDonationCheckoutSession({
  amount,
  campaignId,
  campaignTitle,
  userId,
  successUrl,
  cancelUrl,
}: {
  amount: number
  campaignId: string
  campaignTitle: string
  userId?: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Donation – ${campaignTitle}`,
            description: "Tax-deductible donation to LV Temple (501c3)",
          },
          unit_amount: amount * 100, // cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      campaignId,
      userId: userId ?? "guest",
      type: "donation",
    },
    payment_intent_data: {
      metadata: {
        campaignId,
        userId: userId ?? "guest",
      },
    },
  })

  return session
}

export async function createMembershipCheckoutSession({
  tier,
  priceId,
  userId,
  successUrl,
  cancelUrl,
}: {
  tier: string
  priceId: string
  userId: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, tier },
  })
  return session
}
