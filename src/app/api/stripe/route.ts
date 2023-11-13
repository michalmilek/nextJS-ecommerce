import { createOrder, updateGameQuantity } from "@/libs/api";
import { GameWithQuantity } from "@/libs/types";
import { Game } from "@/models/game";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  try {
    const {
      cartItems,
      userEmail,
    }: { cartItems: GameWithQuantity[]; userEmail: string } = await req.json();
    const origin = req.headers.get("origin");

    if (cartItems) {
      cartItems.forEach((item) => {
        if (item.gamesToBuy > item.quantity) {
          return new NextResponse(
            `We dont have enough game: ${item.name} on stock`,
            { status: 400 }
          );
        }
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => ({
        quantity: item.gamesToBuy,
        adjustable_quantity: {
          enabled: true,
          maximum: item.quantity,
          minimum: 1,
        },
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: parseInt((item.price * 100).toString()),
        },
      })),
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: "payment",
      success_url: `${origin}/?success=true`,
    });

    const result = await updateGameQuantity(cartItems);
    console.log("🚀 ~ result:", result);

    const test = await createOrder(cartItems, userEmail);

    return NextResponse.json(session, {
      status: 200,
      statusText: "payment successful",
    });
  } catch (error) {
    console.log("Stripe error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
