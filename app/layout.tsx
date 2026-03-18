import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bittensor Subnet Intelligence Dashboard",
  description: "Bloomberg Terminal for Decentralized AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}