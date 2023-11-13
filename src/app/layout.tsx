import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Providers from "@/providers/providers";
import CartSidebar from "@/components/cart/cart-sidebar/cart-sidebar";
import { getServerSession } from "next-auth";
import { Order } from "@/models/order";
import { getOrders } from "@/libs/api";
import Header2 from "@/components/header/header2";
import ScrollToTop from "@/components/scroll-to-top/scroll-to-top";

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
