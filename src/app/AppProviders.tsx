
"use client";

import { useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import { CoinProvider } from '@/context/CoinContext';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

function AppContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return; // Wait until authentication status is resolved

    const isAuthPage = pathname === '/login';

    if (!isAuthenticated && !isAuthPage) {
      router.push('/login');
    } else if (isAuthenticated && isAuthPage) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading || (!isAuthenticated && pathname !== '/login')) {
    return <SplashScreen />;
  }

  // If authenticated, show the main app layout
  if (isAuthenticated) {
    // Don't show the login page content if the user is authenticated
    if (pathname === '/login') {
       return <SplashScreen />;
    }
    return (
      <CoinProvider>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            {children}
          </div>
        </SidebarProvider>
      </CoinProvider>
    );
  }
  
  // If not authenticated, only show the login page
  return <>{children}</>;
}

export function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AppContent>{children}</AppContent>
    </AuthProvider>
  );
}
