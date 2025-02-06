/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/module/dataTable";
import Loading from "@/components/module/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFetchOrdersQuery, useGetTotalRevenueQuery } from "@/redux/features/order/orderApi";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

const ManageDashboardOrdersTable: FC = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [ setSelectedOrder] = useState<any | null>(null);

  const { data, isError, isLoading, isSuccess, error } = useFetchOrdersQuery([
    { name: "limit", value: limit || 10 },
    { name: "page", value: page || 1 },
    { name: "searchTerm", value: search || "" },
  ]);
  const {data:revenue}=useGetTotalRevenueQuery(undefined)
console.log(revenue);
  useEffect(() => {
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isError, isSuccess, error]);
  const handleConfirmClick = (order: any) => {
    setSelectedOrder(order);
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
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "orderPayment",
      header: "Payment Status",
      cell: ({ row }) => (
        <Badge variant={row.original.orderPayment === "paid" ? "secondary" : "destructive"}>
          {row.original.orderPayment || "Unpaid"}
        </Badge>
      ),
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <Button variant="outline" onClick={() => handleConfirmClick(row.original)}>
            Confirm Order
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
console.log(data);
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
            <DialogTitle>Confirm Order</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to confirm this order?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={() => {
              toast.success("Order confirmed!");
              setConfirmDialogOpen(false);
            }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageDashboardOrdersTable;
