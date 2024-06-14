"use client";

import { getAuthTokens } from "@/lib/utils/tokens";
import React from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

interface Props {
  children?: React.ReactNode;
}

const client = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const authTokens = getAuthTokens();
    return {
      headers: {
        authorization: authTokens ? `Bearer ${authTokens.token}` : "",
      },
    };
  },
});

const URQLProvider: React.FC<Props> = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default URQLProvider;
