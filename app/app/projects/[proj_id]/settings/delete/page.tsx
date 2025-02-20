"use client"
import { Button } from "@/components/ui/button";
import { useApiDelete } from "@/hooks/useApi";
import { TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
  const { proj_id } = useParams();

  const { mutate: deleteProject } = useApiDelete(`/project/delete/${proj_id}`);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Delete project</p>
      <div className="flex gap-2 p-4 bg-secondary rounded-lg border items-center">
        <TriangleAlert className="stroke-destructive" />
        <div className="flex flex-col gap-1">
          <p className="text-sm">Permanently delete project {proj_id}. This action is not reversible.</p>
          <p className="text-sm">Are you sure you want to delete this project?</p>
        </div>
      </div>
      <Button variant="destructive" onClick={() => {
        deleteProject();
      }}>Delete Project</Button>
    </div>
  )
}