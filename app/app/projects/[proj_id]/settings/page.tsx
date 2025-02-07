"use client"
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const projectId = params?.proj_id;

  if (!projectId) {
    redirect('/app/projects');
  }

  redirect(`/app/projects/${projectId}/settings/general`);
}