import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Rookie House - Something Epic is Brewing",
  description: "Help the Rookie unlock the secret! An interactive retro game experience. Coming Soon!",
  icons: {
    icon: "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV545Xp1cqdU3sNmvk2fuzrJQIMxFZd46hK8e0D7",
    shortcut: "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV545Xp1cqdU3sNmvk2fuzrJQIMxFZd46hK8e0D7",
    apple: "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV545Xp1cqdU3sNmvk2fuzrJQIMxFZd46hK8e0D7",
  },
  openGraph: {
    title: "Rookie House - Something Epic is Brewing",
    description: "Help the Rookie unlock the secret! An interactive retro game experience.",
    images: ["https://605d1c1rw3.ufs.sh/f/exk2nUW1nV545Xp1cqdU3sNmvk2fuzrJQIMxFZd46hK8e0D7"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rookie House - Something Epic is Brewing",
    description: "Help the Rookie unlock the secret! An interactive retro game experience.",
    images: ["https://605d1c1rw3.ufs.sh/f/exk2nUW1nV545Xp1cqdU3sNmvk2fuzrJQIMxFZd46hK8e0D7"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} antialiased`}>{children}</body>
    </html>
  );
}
