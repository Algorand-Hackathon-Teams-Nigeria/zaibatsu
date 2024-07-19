"use client";
import Page from "@atoms/a-page";
import LoanTemplateFilter from "@molecules/m-loan-templates-filter";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";
import LoanTemplatesTable from "@molecules/m-loan-templates-table";
import LoanTemplateActions from "@/components/organisms/o-loan-template-actions";

const P2PPage = () => {
  return (
    <Page>
      <FinancialStatisticsGrid />
      <LoanTemplateFilter />
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold">P2P</h2>
        <LoanTemplateActions loanType="P2P" />
      </div>
      <LoanTemplatesTable />
    </Page>
  );
};

export default P2PPage;
