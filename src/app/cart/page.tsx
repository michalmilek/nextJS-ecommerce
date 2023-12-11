import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Cart from "@/components/cart/cart";

const page = async () => {
  const session = await getServerSession();
  console.log("🚀 ~ session:", session);

  if (!session) {
    return redirect("/sign-in");
  }
  return (
    <div>
      <Cart email={session.user!.email as string} />
    </div>
  );
};

export default page;
