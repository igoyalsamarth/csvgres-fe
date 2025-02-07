import { Button } from "@/components/ui/button";
import { PlugIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col max-w-[1280px] w-full mx-auto gap-6 p-8">
      <div className="flex justify-between items-end">
        <p className="text-2xl font-bold leading-none">Project Dashboard</p>
        <div className="flex gap-2">
          <Button>
            <PlugIcon />
            Connect
          </Button>
          <Button variant="outline">
            Go to Billing
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 bg-secondary border rounded-lg px-4 pb-4 pt-2.5">
        <div className="flex justify-between items-center">
          <p>Usage since Feb 1, 2025
          </p>
          <p className="text-blue-500 text-sm font-semibold">Upgrade</p>
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