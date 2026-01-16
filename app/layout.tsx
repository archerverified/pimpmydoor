import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pimp My Door - Garage Door Builder",
  description: "Customize your Garage Door. Purchase Online or Send Yourself a Quote.",
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
