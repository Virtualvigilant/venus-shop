import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Venus Shop — Discover Your Style",
  description: "Explore the latest trends in women's fashion. Dresses, tops, shoes, accessories and more. Quality fabrics, trendy styles, affordable prices.",
  keywords: ["fashion", "women's clothing", "dresses", "shoes", "accessories", "Venus Shop"],
  openGraph: {
    title: "Venus Shop — Discover Your Style",
    description: "Explore the latest trends in women's fashion at Venus Shop.",
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
