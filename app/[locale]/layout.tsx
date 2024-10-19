import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo - Your Gateway to Multilingualism",
  description: "Your Gateway to Multilingualism",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <ClerkProvider>
    <NextIntlClientProvider messages={messages}>
    <html lang="en">
      <head>
      <link rel="icon" href="https://d35aaqx5ub95lt.cloudfront.net/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </head>
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          {children}
        </body>
    </html>
    </NextIntlClientProvider>
    </ClerkProvider>
  );
}
