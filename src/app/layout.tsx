import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MusicToggle } from "@/components/MusicToggle";
import { PwaRegister } from "@/components/PwaRegister";

export const metadata: Metadata = {
  title: "Our Little Museum",
  description: "A cozy little museum of memories and letters.",
  applicationName: "Our Little Museum",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Our Little Museum",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbd9df",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <PwaRegister />
        <MusicToggle />
        {children}
      </body>
    </html>
  );
}
