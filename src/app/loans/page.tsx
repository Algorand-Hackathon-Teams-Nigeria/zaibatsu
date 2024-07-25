import Page from "@/components/atoms/a-page";
import FinancialStatisticsGrid from "@/components/molecules/m-financial-statistics-grid";
import LoanTable from "@/components/molecules/m-loans-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoanActions from "@organisms/o-loan-actions";

const LoansPage = () => {
  return (
    <Page>
      <FinancialStatisticsGrid />
      <div>
        <LoanActions />
      </div>
      <Tabs defaultValue="collected">
        <div className="flex flex-col md:flex-row gap-3 mb-4 items-center justify-between">
          <h4>Loans</h4>
          <TabsList className="flex items-center gap-4">
            <TabsTrigger value="marketplace">Market Place</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
            <TabsTrigger value="collected">Collected</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="marketplace">
          <LoanTable variant="marketplace" />
        </TabsContent>
        <TabsContent value="sold">
          <LoanTable variant="sold" />
        </TabsContent>
        <TabsContent value="collected">
          <LoanTable variant="collected" />
        </TabsContent>
      </Tabs>
    </Page>
  );
};

export default LoansPage;
