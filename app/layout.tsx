import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Workout Plans",
  description: "Generate personalized workout plans with OpenAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 text-gray-900">
          <ReactQueryClientProvider>
            <NavBar />
            {/* Main container for page content */}
            <main className="max-w-7xl mx-auto pt-16 p-4 min-h-screen">
              {children}
            </main>
          </ReactQueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
