import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Delete Account</p>
      <p>Before you can delete your account, you need to:</p>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <CheckCircle />
          <p>Delete all your projects</p>
        </div>
      </div>
      <Button variant="destructive">Delete Account</Button>
    </div>
  );
}