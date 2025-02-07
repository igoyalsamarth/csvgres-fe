'use client'
import { Check, CircleHelp, ChevronsUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { CommandItem } from "../ui/command";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { CommandGroup } from "../ui/command";
import { CommandEmpty } from "../ui/command";
import { CommandList } from "../ui/command";
import { Button } from "../ui/button";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Popover } from "../ui/popover";
import { Command } from "../ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function Header() {

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
    <header className="flex items-center justify-between bg-background border-border border-b px-8 min-h-16">
      <div className="flex items-center gap-4">
        <p>Logo</p>
        <p className="text-4xl text-muted-foreground">/</p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Button asChild variant='ghost' className="gap-2 hover:bg-secondary/50">
                  <Link href="/app/projects">
                    <p>Samarth</p>
                    <Badge variant="secondary">FREE</Badge>
                  </Link>
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
  );
}