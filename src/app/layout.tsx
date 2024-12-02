import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import { CartProvider } from '@/context/CartContext'
import { AuthContextProvider } from '@/lib/context/AuthContext'

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bellair Golf Course App",
  description: "Mobile application for Bellair Golf Course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased text-gray-900`}
      >
        <AuthContextProvider>
          <CartProvider>
            <ClientLayout>{children}</ClientLayout>
          </CartProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
