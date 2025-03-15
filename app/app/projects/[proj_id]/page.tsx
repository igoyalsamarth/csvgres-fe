"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApiQuery } from "@/hooks/useApi";
import { CopyIcon, EyeIcon, PlugIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Project {
  projectid: string;
  projectname: string;
  region: string;
  createdat: string;
  databases: Database[];
}

interface Database {
  database_id: string;
  database_name: string;
  storage: number;
  data_transfer: number;
  compute: number;
}

export default function Page() {
  const params = useParams();
  const proj_id = params.proj_id as string;

  const { data: project = {} as Project, isLoading, error } = useApiQuery<Project>(["project", proj_id], `/project/${proj_id}`);

  if (error) return <div>Error loading project: {error.message}</div>;
  if (isLoading || !project || !project.databases) return <div>Loading...</div>;

  const totalStorage = project?.databases?.reduce((acc, db) => acc + db.storage, 0);
  const totalDataTransfer = project?.databases?.reduce((acc, db) => acc + db.data_transfer, 0);
  const totalCompute = project?.databases?.reduce((acc, db) => acc + db.compute, 0);

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
            <DialogContent className="sm:max-w-[748px]">
              <DialogHeader>
                <DialogTitle>Connect to your database</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-8 w-full">
                <div className="flex gap-4 w-full items-end">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Label htmlFor="database">
                      Database
                    </Label>
                    <Select defaultValue={project.databases[0].database_id}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a database" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {project.databases.map((db) => (
                            <SelectItem key={db.database_id} value={db.database_id}>
                              {db.database_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="database">
                        Role
                      </Label>
                      <Button variant="link" className="p-0 text-muted-foreground h-fit s-fit">
                        Reset Password
                      </Button>
                    </div>
                    <Select defaultValue={project.databases[0].database_id}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a database" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {project.databases.map((db) => (
                            <SelectItem key={db.database_id} value={db.database_id}>
                              {db.database_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="uri">
                    Connection String
                  </Label>
                  <div className="flex flex-col gap-0.5">
                    <div className="bg-secondary px-4 py-2 rounded-t-md min-h-[200px] text-sm font-mono connection-string">
                      postgresql://{project.databases[0].database_name}:{project.databases[0].database_name}@{proj_id}.ap-southeast-1.aws.neon.tech/{project.databases[0].database_name}
                    </div>
                    <div className="bg-secondary px-2 py-1 rounded-b-md flex gap-4">
                      <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <EyeIcon />
                        Show Password
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          const connectionStringDiv = document.querySelector('.connection-string') as HTMLDivElement;
                          if (connectionStringDiv) {
                            navigator.clipboard.writeText(connectionStringDiv.textContent || '');
                            const btn = document.activeElement as HTMLButtonElement;
                            const icon = btn.querySelector('svg');
                            if (icon) {
                              icon.innerHTML = '<path d="M20 6L9 17l-5-5"/>';
                            }
                          }
                        }}
                      >
                        <CopyIcon />
                        Copy Snippet
                      </Button>
                    </div>
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
            <p className="text-2xl font-semibold">{(totalStorage / 1024).toFixed(2)} GB</p>
          </div>
          <div className="flex flex-col gap-1 bg-background rounded-lg px-5 py-4">
            <p className="text-sm">Compute</p>
            <p className="text-2xl font-semibold">{(totalCompute / 3600000).toFixed(2)} h</p>
          </div>
          <div className="flex flex-col gap-1 bg-background rounded-lg px-5 py-4">
            <p className="text-sm">Data Transfer</p>
            <p className="text-2xl font-semibold">{(totalDataTransfer / 1024).toFixed(2)} GB</p>
          </div>
          <div className="flex flex-col gap-1 bg-background rounded-lg px-5 py-4">
            <p className="text-sm">Databases</p>
            <p className="text-2xl font-semibold">{project?.databases?.length}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-none">
          Metrics may be delayed up to one hour.
        </p>
      </div>
    </div>
  );
}