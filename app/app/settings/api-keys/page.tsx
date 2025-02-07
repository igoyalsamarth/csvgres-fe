import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex  justify-between items-center">
        <p className="text-2xl font-bold">API Keys</p>
        <Button>Create new API Key</Button>
      </div>
      <p>These are your personal API keys. As a reminder, never share your keys with unauthorized users or expose it in client-side code. </p>
      <div className="flex justify-between items-center p-6 bg-secondary rounded-lg border border-border">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Key name</p>
          <p>Test</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Created</p>
          <p>September 22, 2023</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Last used</p>
          <p>September 22, 2023</p>
        </div>
        <EllipsisVertical />
      </div>
    </div>
  );
}