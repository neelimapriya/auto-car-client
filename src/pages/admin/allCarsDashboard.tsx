import { DataTable } from "@/components/module/dataTable";
import DeleteCarDialog from "@/components/module/deleteCarDialouge";
import Loading from "@/components/module/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { TMeta } from "@/types";
import { TCar } from "@/types/carType";
import { ColumnDef } from "@tanstack/react-table";
import { LucideMoreVertical } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const ManageDashboardCarTable: FC = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<TCar | null>(null);

  const { data, isError, isLoading, isSuccess, error } = useGetAllCarsQuery([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "searchTerm", value: search },
  ]);

  useEffect(() => {
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isError, isSuccess, error]);

  const handleDeleteClick = (car: TCar) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const columns: ColumnDef<TCar>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="rounded-lg overflow-hidden w-20 shadow-md">
          <img
            src={row.original.image || ""}
            alt={row.original.model}
            className="rounded-lg transition-transform duration-300 hover:scale-110"
          />
        </div>
      ),
    },
    { accessorKey: "brand", header: "Brand" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "price", header: "Price" },
    {
      accessorKey: "inStock",
      header: "In Stock",
      cell: ({ row }) => (
        <Badge className="capitalize" variant={row.original.inStock ? "secondary" : "destructive"}>
          {row.original.inStock ? "Yes" : "No"}
        </Badge>
      ),
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
            <DropdownMenuItem>
              <Link to={`/dashboard/update-car/${row.original._id}`} className="text-blue-500 hover:underline">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteClick(row.original)} className="text-red-500 hover:underline">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (isError || !data) return <div>Error loading data</div>;
  if (!data?.data) return <Loading />;

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        onSearchValueChange={setSearch}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
        meta={data?.meta as TMeta}
      />
      <DeleteCarDialog car={carToDelete} open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} />
    </>
  );
};

export default ManageDashboardCarTable;
