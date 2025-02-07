"use client"
import VerticalRouteTabs from "@/components/Shared/VerticalRouteTabs";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const projectId = params?.proj_id;

  const routes = [
    { name: "General", href: `/app/projects/${projectId}/settings/general` },
    { name: "Delete Project", href: `/app/projects/${projectId}/settings/delete` },
  ]
  return (
    <div className="grid grid-cols-4 max-w-[1280px] w-full mx-auto gap-6 p-8 h-fit">
      <div>
      </div>
      <div className="col-span-3">
        <p className="text-3xl font-bold">Settings</p>
      </div>
      <div className="flex w-full justify-end">
        <VerticalRouteTabs routes={routes} />
      </div>
      <div className="col-span-3 w-full p-6 border border-border rounded-lg">
        {children}
      </div>
    </div>
  );
}