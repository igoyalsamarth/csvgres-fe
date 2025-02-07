'use client'
import { Handshake, Settings, CreditCard, Folders, LayoutDashboard, TerminalSquare, Table } from "lucide-react";
import { Sidebar, SidebarFooter, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarContent, SidebarGroupLabel } from "../ui/sidebar";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SideNavbar() {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params?.proj_id;

  const projectNavigation = [
    {
      group: 'PROJECT',
      items: [
        {
          label: "Dashboard",
          href: `/app/projects/${projectId}`,
          icon: LayoutDashboard
        },
        {
          label: "SQL Editor",
          href: `/app/projects/${projectId}/query`,
          icon: TerminalSquare
        },
        {
          label: "Tables",
          href: `/app/projects/${projectId}/tables`,
          icon: Table
        },
        {
          label: "Settings",
          href: `/app/projects/${projectId}/settings/general`,
          icon: Settings
        }
      ]
    }
  ];

  const mainNavigation = [
    {
      group: 'ACCOUNTS',
      items: [
        {
          label: "Projects",
          href: "/app/projects",
          icon: Folders
        },
        {
          label: "Billing",
          href: "/app/billing",
          icon: CreditCard
        },
        {
          label: "Settings",
          href: "/app/settings/profile",
          icon: Settings
        }
      ]
    }
  ];

  const sideNavbar = projectId ? projectNavigation : mainNavigation;

  return (
    <Sidebar collapsible="none" variant="floating" className="!max-h-[calc(100vh-64px)] flex">
      <SidebarContent>
        {sideNavbar.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="font-medium">{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="px-2 flex flex-col gap-1">
                  {group.items.map((item) => (
                    <SidebarMenuButton
                      key={item.label}
                      asChild
                      className={cn(
                        pathname === item.href && "bg-secondary"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem className="px-2">
            <SidebarMenuButton asChild>
              <Link href="/app/feedback">
                <Handshake />
                <span>Feedback</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}