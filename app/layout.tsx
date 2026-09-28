import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOMAS AUTOWORKS | Tacloban — Stance, Fitment, Drag Prep & Euro Tuning",
  description:
    "We don't do stock. We do perfect. Premium rims, performance upgrades, stance builds, drag prep, and Euro tuning in Tacloban City, Leyte.",
  icons: {
    icon: "/logo-square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
