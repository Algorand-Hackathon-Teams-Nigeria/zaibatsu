"use client";

import Page from "@/components/atoms/a-page";
import LoanTemplateOverview from "@/components/organisms/o-loan-template-overview";
import { useLoanTemplateQuery } from "@/services/graphql/generated";
import React from "react";

interface Props {
  params: {
    templateId: string;
  };
}

const LoanTemplateDetailsPage: React.FC<Props> = ({ params }) => {
  const [{ fetching, data }] = useLoanTemplateQuery({
    variables: {
      templateId: Number(params.templateId),
    },
  });

  return (
    <Page>
      <LoanTemplateOverview fetching={fetching} data={data} />
    </Page>
  );
};

export default LoanTemplateDetailsPage;
