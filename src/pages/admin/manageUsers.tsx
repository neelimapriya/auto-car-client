/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery } from '@/redux/features/users/userApi';
import { DataTable } from "@/components/module/dataTable";
import Loading from "@/components/module/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LucideMoreVertical } from 'lucide-react';
import DeleteUserModal from '@/components/module/deleteUserdialouge';

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="hover:bg-gray-200">
                <LucideMoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-lg">
           
              <DropdownMenuItem onClick={() => handleDeleteUser(row.original)} className="text-red-500 hover:underline">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

<DeleteUserModal user={selectedUser} open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} />
    </>
  );
};

export default ManageUsers;

