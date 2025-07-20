import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import { CoinProvider } from '@/context/CoinContext';

export const metadata: Metadata = {
  title: 'AdFun Rewards',
  description: 'Earn coins by completing simple tasks!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CoinProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              {children}
            </div>
          </SidebarProvider>
        </CoinProvider>
        <Toaster />
      </body>
    </html>
  );
}
