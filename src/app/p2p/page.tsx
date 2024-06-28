"use client";
import Page from "@atoms/a-page";
import LoanTemplateFilter from "@molecules/m-loan-templates-filter";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";
import LoanTemplatesTable from "@molecules/m-loan-templates-table";
import LoanTemplateActions from "@/components/organisms/o-loan-template-actions";
import { LoanEnumType } from "@/services/graphql/generated";
import LoanTemplatesP2PTable from "@/components/molecules/m-loan-template-p2p";
import { useState } from "react";
const testValue = [
  { label: "Pool" },
  { label: "Transaction History" },
  { label: "Your offers" },
];

const data = [
  {
    offerAddress: "6NN46NN.....ZABCX",
    asset: {
      imageUrl: "vercel.svg",
      name: "Asset 1",
      unitName: "AS1",
      decimals: 1000000,
    },
    maxAmount: "Max Amount",
    minMaxCollected: "10,000 - 50,000",
    repaymentMethod: "4",
    minMaxTenure: "3-8 months",
    minMaxInt: "10% - 20%",
    status: "Active",
  },
  {
    offerAddress: "5TT55TT.....YZXWV",
    asset: {
      imageUrl: "vercel.svg",
      name: "Asset 2",
      unitName: "AS2",
      decimals: 1000000,
    },
    maxAmount: "Max Amount",
    minMaxCollected: "20,000 - 60,000",
    repaymentMethod: "4",
    minMaxTenure: "6-12 months",
    minMaxInt: "12% - 18%",
    status: "Closed",
  },
  {
    offerAddress: "4BB44BB.....UVWXZ",
    asset: {
      imageUrl: "vercel.svg",
      name: "Asset 3",
      unitName: "AS3",
      decimals: 1000000,
    },
    maxAmount: "Max Amount",
    minMaxCollected: "15,000 - 45,000",
    repaymentMethod: "4",
    minMaxTenure: "5-10 months",
    minMaxInt: "14% - 22%",
    status: "active",
  },
];

const YourOffersTable = LoanTemplatesTable;
const TransactionHistory = LoanTemplatesP2PTable;
const PoolTable = LoanTemplatesTable;

const P2PPage = () => {
  const [value, setvalue] = useState("Pool");
  return (
    <Page>
      <FinancialStatisticsGrid />
      <LoanTemplateFilter />
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold">P2P</h2>
        <LoanTemplateActions
          valueList={testValue}
          value={value}
          setValue={(item: any) => setvalue(item)}
          loanType={LoanEnumType.P2P}
        />
      </div>
      {value == "Your offers" ? (
        <YourOffersTable />
      ) : value == "Pool" ? (
        <PoolTable />
      ) : (
        <TransactionHistory data={data} />
      )}
    </Page>
  );
};

export default P2PPage;
