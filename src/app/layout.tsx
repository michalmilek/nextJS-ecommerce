import type { Metadata } from "next";
import "./globals.css";

import { getServerSession } from "next-auth";
import { Poppins, Raleway } from "next/font/google";

import CartSidebar from "@/components/cart/cart-sidebar/cart-sidebar";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Header2 from "@/components/header/header2";
import ScrollToTop from "@/components/scroll-to-top/scroll-to-top";
import { getOrders } from "@/libs/api";
import { Order } from "@/models/order";
import Providers from "@/providers/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Nextjs Ecommerce",
  description: "This is a shop where we sell online games",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  let orders: undefined | Order[];

  if (session) {
    orders = await getOrders(session.user!.email as string);
  }

  return (
    <html
      className={`${poppins.variable} ${raleway.variable}`}
      lang="en">
      <body className="bg-gray-800 text-white max-w-[100vw] w-full overflow-x-hidden min-h-screen flex flex-col justify-between">
        <Providers>
          <Header orders={orders} />
          <Header2 />
          <main>{children}</main>
          <CartSidebar />
        </Providers>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
