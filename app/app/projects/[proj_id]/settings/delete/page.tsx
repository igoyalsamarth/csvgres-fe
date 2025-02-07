import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Delete project</p>
      <div className="flex gap-2 p-4 bg-secondary rounded-lg border items-center">
        <TriangleAlert className="stroke-destructive" />
        <p className="text-sm">Deleting this project will remove all data associated with it. This action is irreversible.</p>
      </div>
      <Button variant="destructive">Delete Project</Button>
    </div>
  )
}