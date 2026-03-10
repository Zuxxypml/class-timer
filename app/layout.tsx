import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stopwatch & Countdown Timer",
  description: "A modern stopwatch and countdown timer application",
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "32x32" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/assets/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Stopwatch & Countdown Timer",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stopwatch-timer.com",
    title: "Stopwatch & Countdown Timer",
    description: "A modern stopwatch and countdown timer application",
    images: [
      {
        url: "/assets/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Stopwatch & Countdown Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stopwatch & Countdown Timer",
    description: "A modern stopwatch and countdown timer application",
    images: ["/assets/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#667eea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
