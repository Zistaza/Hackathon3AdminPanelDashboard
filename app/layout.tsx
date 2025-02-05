"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";




// Custom Fonts
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

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // React Query Client

  return (
    
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <QueryClientProvider client={queryClient}>
          <DashboardLayout>{children}</DashboardLayout>
        </QueryClientProvider>
       
      </body>
    </html>
    

  );
}
