
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Home,
  Gift,
  Users,
  Settings,
  LogOut,
  RotateCw,
  ShieldCheck,
  Star,
  Wallet,
  Mail,
  HelpCircle,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "../Logo";
import { FileText } from "../icons/FileText";

const ScratchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2.5 4 11l-2 2 2 2 7.5 8.5L16 14l2-2-2-2-1.5-1.5" />
    <path d="m18 6 2.5 2.5" />
    <path d="m14 10 1 1" />
    <path d="m7 17 1 1" />
  </svg>
);


const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/offer-wall", label: "Offer Wall", icon: Star },
  { href: "/spin-win", label: "Spin & Win", icon: RotateCw },
  { href: "/scratch-cards", label: "Scratch Cards", icon: ScratchIcon },
  { href: "/daily-bonus", label: "Daily Bonus", icon: Gift },
  { href: "/captcha", label: "Solve Captcha", icon: ShieldCheck },
  { href: "/refer-earn", label: "Refer & Earn", icon: Users },
  { href: "/withdraw", label: "Withdraw", icon: Wallet },
];

const settingsMenuItems = [
  { href: "/help-faqs", label: "Help/FAQs", icon: HelpCircle },
  { href: "/contact-us", label: "Contact Us", icon: Mail },
  { href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
  { href: "/terms-and-conditions", label: "Terms & Conditions", icon: FileText },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <Sidebar className="border-r" collapsible="icon">
        <SidebarHeader className="p-4 flex items-center justify-center gap-2">
            <Logo className="w-7 h-7 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 transition-all"/>
            <h1 className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">AdFun Rewards</h1>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={{children: item.label, side:"right"}}>
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 flex flex-col gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 mt-2">
                    <Settings /> <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" side="top">
                {settingsMenuItems.map((item) => (
                   <DropdownMenuItem key={item.label} asChild>
                     <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                     </Link>
                   </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2" onClick={logout}>
                <LogOut /> <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
        </SidebarFooter>
    </Sidebar>
  );
}
