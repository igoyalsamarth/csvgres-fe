import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, GalleryVertical, PlusCircleIcon, Settings, TerminalIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Your Projects</p>
        <div className="flex gap-2">
          <Button>
            New Project
          </Button>
          <Button variant="outline">
            Migrate to Csvgres
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-secondary border rounded-lg p-4">
        <div className="flex justify-between">
          <p className="font-semibold">Account Usage</p>
          <p>1000/1000</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col gap-2 bg-background rounded-lg p-4">
            <p>Storage</p>
            <p>1000/1000</p>
          </div>
          <div className="flex flex-col gap-2 bg-background rounded-lg p-4">
            <p>Compute</p>
            <p>1000/1000</p>
          </div>
          <div className="flex flex-col gap-2 bg-background rounded-lg p-4">
            <p>Data Transfer</p>
            <p>1000/1000</p>
          </div>
          <div className="flex flex-col gap-2 bg-background rounded-lg p-4">
            <p>Projects</p>
            <p>1000/1000</p>
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
            <tr>
              <td className="p-4 text-sm">Project 1</td>
              <td className="p-4 text-sm">AWS - Mumbai</td>
              <td className="p-4 text-sm">9 October 2024</td>
              <td className="p-4 text-sm">24 MB</td>
              <td className="p-4">
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
