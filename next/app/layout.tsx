import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnlyWrapper from "@/app/components/ClientOnlyWrapper";
import RegisterModal from "@/app/components/modals/RegisterModal";
import Navbar from "@/app/components/navbar/Navbar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import LoginModal from "./components/modals/LoginModal";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PartyX",
  description: "PartyX Next.js app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnlyWrapper>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnlyWrapper>
        {children}
      </body>
    </html>
  );
}
