
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
    if (isLoading) {
      return; // Wait until authentication status is resolved
    }

    const isAuthPage = pathname === '/login';

    // If the user is not authenticated and not on the login page, redirect to login
    if (!isAuthenticated && !isAuthPage) {
      router.replace('/login');
    } 
    // If the user is authenticated and on the login page, redirect to the dashboard
    else if (isAuthenticated && isAuthPage) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // While loading authentication or if a redirect is imminent, show the splash screen
  if (isLoading || (!isAuthenticated && pathname !== '/login') || (isAuthenticated && pathname === '/login')) {
    return <SplashScreen />;
  }

  // If authenticated and not on a public page, show the main app layout
  if (isAuthenticated) {
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

  // Otherwise, show the children (this will be the login page)
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
