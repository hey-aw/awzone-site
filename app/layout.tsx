import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://awzone.com"),
  title: {
    default: "AWzone — Notes and working examples",
    template: "%s · AWzone",
  },
  description:
    "Notes, examples, and lessons from building AI products for learning, care, and other high-context work.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "AWzone — Notes and working examples",
    description:
      "A public notebook about AI products, learning, user experience, and human understanding.",
    url: "https://awzone.com",
    siteName: "AWzone",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AWzone — Notes and working examples",
    description:
      "A public notebook about AI products, learning, user experience, and human understanding.",
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
