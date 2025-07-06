import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import DevToolsBlocker from "@/components/DevToolsBlocker";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Client Request Form",
  description: "A comprehensive form to submit requests for new websites.",
  icons: {
    icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3crect width='100' height='100' rx='20' fill='hsl(275 100% 25%)'%3e%3c/rect%3e%3ctext x='50' y='50' font-family='sans-serif' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3eCRF%3c/text%3e%3c/svg%3e",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased flex flex-col",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <DevToolsBlocker />
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
