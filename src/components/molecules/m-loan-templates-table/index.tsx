"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoanTemplatesQuery } from "@/services/graphql/generated";
import Image from "next/image";
import { ellipseAddress } from "@/lib/utils/address";
import Link from "next/link";
import { useAtomValue } from "jotai";
import listOptionsAtoms from "@state/atoms/listOptions";

const LoanTemplatesTable = () => {
  const listOpts = useAtomValue(listOptionsAtoms.p2pLoanTemplate);
  const [{ fetching, data }] = useLoanTemplatesQuery({
    variables: { opts: listOpts },
  });

  const templates = data?.loanTemplates ?? [];
  return (
    <div>
      <Table borderless>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Max Amount</TableHead>
            <TableHead className="hidden lg:table-cell">
              Interest Rate
            </TableHead>
            <TableHead className="hidden xl:table-cell">
              Collateral Percentage
            </TableHead>
            <TableHead className="hidden xl:table-cell">
              Repayments Periods
            </TableHead>
            <TableHead className="hidden xl:table-cell">Max Tenure</TableHead>
            <TableHead className="text-right">Creator</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.length > 0 &&
            !fetching &&
            templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <Image
                    src={template.asset.imageUrl}
                    alt={template.asset.name}
                    width={30}
                    height={30}
                  />
                </TableCell>
                <TableCell>
                  {(template.maxLoanAmount / template.asset.decimals).toFixed(
                    2,
                  )}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {template.interestRate}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {template.collateralPercentage}
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-cell">
                  {template.repaymentPeriods}
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-cell">
                  {template.maxLoanTenure}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={
                      template.creator
                        ? `/profiles/${template.creator.address}`
                        : `/pools/${template.pool?.id}`
                    }
                  >
                    {template.creator?.address
                      ? ellipseAddress(template.creator.address)
                      : template.pool?.name}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {templates.length === 0 && !fetching && (
        <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
          <p className="border p-2 rounded-md px-4 opacity-60">
            There a currently no Loan offerings available
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanTemplatesTable;
