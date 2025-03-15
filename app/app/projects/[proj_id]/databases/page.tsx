"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTrigger, DialogContent, DialogFooter, DialogTitle, Dialog } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useApiDelete, useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

interface Database {
  database_id: string;
  database_name: string;
  created_at: string;
  storage: number;
  data_transfer: number;
  compute: number;
}

interface DatabaseUpdatePayload {
  name: string;
}

export default function Page() {
  const queryClient = useQueryClient();
  const [newDatabaseOpen, setNewDatabaseOpen] = useState(false);
  const [renameDatabase, setRenameDatabase] = useState({
    open: false,
    database_id: "",
    database_name: ""
  });
  const [databaseName, setDatabaseName] = useState("");
  const { proj_id } = useParams();

  const { data: databases, error, isLoading } = useApiQuery<Database[]>(["databases"], `/databases/${proj_id}`);
  const { mutate: createDatabase, isPending: isCreatingDatabase } = useApiMutation(`/database/${proj_id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["databases"] });
      setNewDatabaseOpen(false);
      setDatabaseName("");
    }
  });
  const { mutate: deleteDatabase, isPending: isDeletingDatabase } = useApiDelete(`/database/delete/${proj_id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["databases"] });
    }
  });
  const { mutate: updateDatabase, isPending: isUpdatingDatabase } = useApiMutation<unknown, DatabaseUpdatePayload>(`/database/rename/${renameDatabase.database_id}`, {
    onSuccess: () => {
      setRenameDatabase({
        open: false,
        database_id: "",
        database_name: ""
      });
      queryClient.invalidateQueries({ queryKey: ["databases"] });
    }
  });

  if (error) return <div>Error loading projects: {error.message}</div>;
  if (isLoading || !databases || isDeletingDatabase) return <div>Loading...</div>;

  const databasesList = Array.isArray(databases) ? databases : [];

  return (
    <div className="flex flex-col max-w-[1280px] w-full mx-auto gap-6 p-8">
      <div className="flex justify-between items-end">
        <p className="text-2xl font-bold leading-none">Your Databases</p>
        <Dialog open={newDatabaseOpen} onOpenChange={setNewDatabaseOpen}>
          <DialogTrigger asChild>
            <Button>
              New Database
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Database Creation</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">
                Name
              </Label>
              <Input id="name" placeholder="Name will be auto-generated if left blank" className="col-span-3" value={databaseName} onChange={(e) => setDatabaseName(e.target.value)} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => createDatabase({ name: databaseName })}
                disabled={isCreatingDatabase || databaseName.length === 0}
              >
                {isCreatingDatabase ? "Creating..." : "Create Database"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border border-secondary rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-secondary">
              <th className="p-4 text-sm rounded-tl-lg">Name</th>
              <th className="p-4 text-sm">Created at</th>
              <th className="p-4 text-sm">Storage</th>
              <th className="p-4 text-sm">Data Transfer</th>
              <th className="p-4 text-sm">Compute</th>
              <th className="p-4 text-sm rounded-tr-lg w-4"></th>
            </tr>
          </thead>
          <tbody>
            {databasesList.map((database) => (
              <tr key={database.database_id} className="hover:bg-secondary duration-150">
                <td className="px-4 py-1 text-sm">{database.database_name}</td>
                <td className="px-4 py-1 text-sm">{dayjs(database.created_at).format("DD MMM YYYY")}</td>
                <td className="px-4 py-1 text-sm">{database.storage} MB</td>
                <td className="px-4 py-1 text-sm">{database.data_transfer} MB</td>
                <td className="px-4 py-1 text-sm">{database.compute} h</td>
                <td className="p-4" onClick={e => e.stopPropagation()}>
                  <Dialog open={renameDatabase.open}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><EllipsisVertical /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-10">
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild onClick={() => {
                            setRenameDatabase({
                              open: true,
                              database_id: database.database_id,
                              database_name: database.database_name
                            });
                          }}>
                            <DialogTrigger className="w-full">
                              <Pencil />
                              Rename
                            </DialogTrigger>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteDatabase(database.database_id)}>
                            <Trash />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Database Details</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                          Name
                        </Label>
                        <Input id="name" className="col-span-3" value={renameDatabase.database_name} onChange={(e) => setRenameDatabase({ ...renameDatabase, database_name: e.target.value })} />
                      </div>
                      <DialogFooter>
                        <Button disabled={isUpdatingDatabase || renameDatabase.database_name.length === 0} onClick={() => updateDatabase({ name: renameDatabase.database_name })}>
                          {isUpdatingDatabase ? "Updating..." : "Update"}
                        </Button>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
