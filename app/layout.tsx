import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://awzone.com"),
  title: "AW — AI products for human understanding",
  description:
    "AW is an AI product developer working across education and healthcare, focused on learning, clear user experience, and systems that respect attention.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "AW — AI products for human understanding",
    description:
      "Product development across education and healthcare, focused on learning, clarity, and attention.",
    url: "https://awzone.com",
    siteName: "AW",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "I build AI products for human understanding.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AW — AI products for human understanding",
    description:
      "Product development across education and healthcare, focused on learning, clarity, and attention.",
    images: ["/og.png"],
  },
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
