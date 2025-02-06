/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery } from '@/redux/features/users/userApi';
import { DataTable } from "@/components/module/dataTable";
import Loading from "@/components/module/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

const ManageUsers = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const { data, isError, isLoading, isSuccess, error } = useGetAllUsersQuery([
    { name: "limit", value: limit || 10 },
    { name: "page", value: page || 1 },
    { name: "searchTerm", value: search || "" },
  ]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong while fetching users.");
    }
  }, [isError, isSuccess, error]);

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setConfirmDialogOpen(true);
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant={row.original.role === "admin" ? "secondary" : "default"}>
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Button variant="outline" onClick={() => handleDeleteUser(row.original)}>
          Delete User
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  if (!data?.data) {
    return <Loading />;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        onSearchValueChange={setSearch}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
        meta={data?.meta ?? { page: 1, limit: 10, totalPage: 1, total: 0 }}
      />

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete user {selectedUser?.name}?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast.success(`User ${selectedUser?.name} deleted successfully!`);
                setConfirmDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageUsers;

