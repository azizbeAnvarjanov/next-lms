import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const TableSkeleton = () => {
  const tables = [{}, {}, {}, {}, {}, {}, {}];
  return (
    <div className="w-[100%] border-2 ">
      {tables.map((table, i) => (
        <TableRow key={i} className="w-full">
          <TableCell className="font-medium">
            <Skeleton className="h-5 w-[300px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-[70px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-7 w-7" />
          </TableCell>
        </TableRow>
      ))}
    </div>
  );
};

export default TableSkeleton;
