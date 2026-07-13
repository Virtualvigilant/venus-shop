import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wajose — Smart · Wear · Home",
  description: "Curated fashion for the whole family, plus statement carpets and door mats — delivered across Kenya. Where style meets the warmth of home.",
  keywords: ["Wajose", "Kenya fashion", "online shopping Kenya", "M-Pesa", "ankara", "carpets", "doormats", "women's fashion", "men's fashion", "kids fashion"],
  openGraph: {
    title: "Wajose — Smart · Wear · Home",
    description: "Curated fashion for the whole family, plus statement carpets and door mats — delivered across Kenya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
