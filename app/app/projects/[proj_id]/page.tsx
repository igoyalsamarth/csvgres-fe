import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlugIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col max-w-[1280px] w-full mx-auto gap-6 p-8">
      <div className="flex justify-between items-end">
        <p className="text-2xl font-bold leading-none">Project Dashboard</p>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlugIcon />
                Connect
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Connect to your database</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="database">
                    Database
                  </Label>
                  <p>db name option</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username">
                    Connection String
                  </Label>
                  <div className=" bg-secondary px-2 py-1 border rounded-md">
                    testing this is a uri
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            Go to Billing
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 bg-secondary border rounded-lg px-4 pb-4 pt-2.5">
        <div className="flex justify-between items-center">
          <p>Usage since Feb 1, 2025
          </p>
          <Link href="/app/billing" className="text-blue-500 text-sm font-semibold">Upgrade</Link>
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
    </div>
  );
}