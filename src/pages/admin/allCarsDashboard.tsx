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

import { useGetAllCarsQuery } from "@/redux/features/cars/carApi"; // Modify with your car API query
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
    {
      name: "limit",
      value: limit,
    },
    {
      name: "page",
      value: page,
    },
    {
      name: "searchTerm",
      value: search,
    },
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
      cell: ({ row }) => {
        return (
          <div className="rounded-md overflow-hidden w-16">
            <img
              src={row.original.image || ""}
              alt={row.original.model}
              className="rounded-md transition-all transform ease-in-out duration-200 hover:scale-105"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "inStock",
      header: "In Stock",
      cell: ({ row }) => {
        return (
          <>
            {row.original.inStock ? (
              <Badge className="capitalize" variant={"outline"}>
                Yes
              </Badge>
            ) : (
              <Badge className="capitalize" variant={"outline"}>
                No
              </Badge>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <LucideMoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to={`/dashboard/update-car/${row.original._id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteClick(row.original)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }
  if (!data?.data) {
    return <Loading />;
  }

  console.log(data?.data?.data);
  return (
    <>
      <DataTable
        columns={columns}
        data={data?.data?.data ?? []}
        onSearchValueChange={setSearch}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
        meta={data?.meta as TMeta}
      />
      <DeleteCarDialog
        car={carToDelete}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default ManageDashboardCarTable;
