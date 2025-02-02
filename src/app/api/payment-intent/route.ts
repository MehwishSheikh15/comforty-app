// import { NextRequest, NextResponse } from "next/server";

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// export async function POST(request: NextRequest) {
//     try {
//         const { amount } = await request.json();

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount,
//             currency: 'usd',
//             automatic_payment_methods: { enabled: true },
//             // automatic_payment_methods: ['card_present'], 
//         })

//         return NextResponse.json({ clientSecret: paymentIntent.client_secret })

//     }
//     catch (err: unknown) {
//         if (err instanceof Error) {
//             return NextResponse.json({
//                 status: 500,
//                 body: { error: err.message }
//             })
//         }
//     }
// }
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: undefined,
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

// Example of creating a payment intent in an API route (e.g., /pages/api/create-payment-intent.js)
// import Stripe from 'stripe';

// Ensure the environment variable is defined
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// if (!stripeSecretKey) {
//     throw new Error('STRIPE_SECRET_KEY is not defined');
// }

// // Explicitly cast `stripeSecretKey` to a string
// const stripe = new stripe(stripeSecretKey as string, {
//     apiVersion: '2023-10-16', // Ensure compatibility with Stripe's API
// });

// export default async function handler(
//     req: { body: { amount: number } },
//     res: { status: (code: number) => { json: (body: any) => void } }
// ) {
//     const { amount } = req.body;

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount * 100, // Convert to cents
//             currency: 'usd',
//         });

//         res.status(200).json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         // Ensure `error` is properly typed
//         if (error instanceof Error) {
//             res.status(500).json({ error: error.message });
//         } else {
//             res.status(500).json({ error: 'An unknown error occurred' });
//         }
//     }
// }


// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: undefined, // Automatically uses the correct version
// });

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();

//     // Create PaymentIntent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount, // Amount in cents
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//     });

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
//   }
// }
