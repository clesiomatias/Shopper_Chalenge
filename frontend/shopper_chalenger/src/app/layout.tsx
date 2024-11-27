
import type { Metadata } from "next";
import localFont from "next/font/local";
import { TravelProvider } from "@/services/contextsa/TravelContext";
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vamo Ali!",
  icons: {
    icon: "/imgs/logo.png",
  },
  description: "Shopper chalenge , i need this job :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><TravelProvider>
        {children}
      </TravelProvider>
      </body>
    </html>
  );
}
