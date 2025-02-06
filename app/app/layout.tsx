'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, CircleHelp, CreditCard, Folders, GitCompareArrows, Settings } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(frameworks[0].value)
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between bg-background border-border border-b px-8 min-h-16">
        <div className="flex items-center gap-4">
          <p>Logo</p>
          <p className="text-4xl text-muted-foreground">/</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Button variant='ghost' className="gap-2 hover:bg-secondary/50">
                    <p>Samarth</p>
                    <Badge variant="secondary">FREE</Badge>
                  </Button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <p className="text-4xl">/</p>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[100px] justify-between"
                      >
                        {value
                          ? frameworks.find((framework) => framework.value === value)?.label
                          : "Select framework..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue === value ? "" : currentValue)
                                  setOpen(false)
                                }}
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === framework.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon">
            <CircleHelp className="size-6" />
          </Button>
          <Button>Upgrade</Button>
          <Avatar className="size-8 rounded" >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] flex overflow-clip">
        <SidebarProvider>
          <Sidebar collapsible="none" variant="floating" className="!max-h-[calc(100vh-64px)] flex">
            {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="font-medium">ACCOUNT</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem className="px-2">
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <Folders />
                          <span>Projects</span>
                        </a>
                      </SidebarMenuButton>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <CreditCard />
                          <span>Billing</span>
                        </a>
                      </SidebarMenuButton>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <GitCompareArrows />
                          <span>Integrations</span>
                        </a>
                      </SidebarMenuButton>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <Settings />
                          <span>Settings</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
          </Sidebar>
          <main className="max-h-[calc(100vh-64px)] p-8 flex justify-between w-full">
            {children}
          </main>
        </SidebarProvider>
      </main>
    </div>
  );
}
