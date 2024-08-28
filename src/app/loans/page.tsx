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
        <TabsList className="flex items-center gap-4">
          <TabsTrigger value="marketplace">Market Place</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="collected">Collected</TabsTrigger>
        </TabsList>

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
