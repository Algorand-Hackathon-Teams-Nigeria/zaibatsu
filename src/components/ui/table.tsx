import * as React from "react";

import { cn } from "@/lib/utils/ui";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    borderless?: boolean;
  }
>(({ className, borderless, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      data-borderless={borderless}
      className={cn("w-full group caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "group-data-[borderless=true]:border-b-0 [&_tr]:border-b bg-card",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "group-data-[borderless=true]:border-b-0 [&_tr:last-child]:border-0",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "group-data-[borderless=true]:border-t-0 border-t bg-muted/50 font-bold [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "group-data-[borderless=true]:border-b-0 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted !border-b  border-border",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-2 text-left align-middle font-bold text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

/**
 * Creates a table header component from an array of column names.
 *
 * @param {Object} params - The parameters object.
 * @param {string[]} params.columns - An array of strings representing the column names.
 * @returns {JSX.Element} A TableHeader component with the specified columns.
 */
const CustomTableHeader = ({ columns }: { columns: string[] }) => (
  <TableHeader className="bg-card">
    <TableRow>
      {columns.map((header, index, arr) => (
        <TableHead
          key={header}
          className={cn(
            "text-center",
            index === 0 && "pl-6 rounded-l-lg",
            index === 0 && "text-left",
            index === arr.length - 1 && "mr-4 rounded-r-lg"
          )}
        >
          {header}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
);

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  CustomTableHeader,
};
