"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, GalleryVertical, PlusCircleIcon, Settings, TerminalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-[1280px] w-full mx-auto gap-6 p-8">
      <div className="flex justify-between items-end">
        <p className="text-2xl font-bold leading-none">Your Projects</p>
        <div className="flex gap-2">
          <Button>
            New Project
          </Button>
          <Button variant="outline">
            Migrate to Csvgres
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 bg-secondary border rounded-lg px-4 pb-4 pt-2.5">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Account Usage</p>
          <div className="flex gap-1">
            <p className="text-sm text-muted-foreground">Feb 1, 2025 to now •</p>
            <p className="text-blue-500 text-sm font-semibold">Upgrade</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col gap-1 bg-background rounded-lg px-5 py-4">
            <p className="text-sm">Storage</p>
            <p className="text-2xl font-semibold">0.04 <span className="text-sm font-normal">/ 0.5 GB</span></p>
          </div>
          <div className="flex flex-col gap-1 bg-background rounded-lg px-5 py-4">
            <p className="text-sm">Compute</p>
            <p className="text-2xl font-semibold">0.07 <span className="text-sm font-normal">/ 200 h</span></p>
          </div>
          <div className="flex flex-col gap-1 bg-background rounded-lg px-5 py-4">
            <p className="text-sm">Data Transfer</p>
            <p className="text-2xl font-semibold">0 <span className="text-sm font-normal">/ 5 GB</span></p>
          </div>
          <div className="flex flex-col gap-1 bg-background rounded-lg px-5 py-4">
            <p className="text-sm">Projects</p>
            <p className="text-2xl font-semibold">1 <span className="text-sm font-normal">/ 10</span></p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-none">
          Metrics may be delayed up to one hour.
        </p>
      </div>
      <div className="border border-secondary rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-secondary">
              <th className="p-4 text-sm rounded-tl-lg">Name</th>
              <th className="p-4 text-sm">Region</th>
              <th className="p-4 text-sm">Created at</th>
              <th className="p-4 text-sm">Storage</th>
              <th className="p-4 text-sm">Integrations</th>
              <th className="p-4 text-sm rounded-tr-lg w-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => router.push("/app/projects/project-1")} className="hover:bg-secondary cursor-pointer duration-150">
              <td className="px-4 py-1 text-sm">Project 1</td>
              <td className="px-4 py-1 text-sm">AWS - Mumbai</td>
              <td className="px-4 py-1 text-sm">9 October 2024</td>
              <td className="px-4 py-1 text-sm">24 MB</td>
              <td className="px-4 py-1">
                <Button variant="ghost">Add <PlusCircleIcon className="w-4 h-4" /></Button>
              </td>
              <td className="p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost"><EllipsisVertical /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-10">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <GalleryVertical />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <TerminalIcon />
                        SQL Editor
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings />
                        Settings
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
