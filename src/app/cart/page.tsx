import Cart from "@/components/cart/cart";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  console.log("🚀 ~ session:", session);

  if (!session) {
    return redirect("/sign-in");
  }
  return (
    <div>
      <Cart email={session.user!.email} />
    </div>
  );
};

export default page;
