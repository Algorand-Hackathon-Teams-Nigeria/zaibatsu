import { cssBundleHref } from "@remix-run/css-bundle";
import tailwind from "./tailwind.css";
import type { LinksFunction } from "@remix-run/node";
import { RecoilRoot } from "recoil";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";
import WalletProvider from "@providers/wallet";

import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/trispace/wght.css";
import { AppShellWithNavigation } from "./components/organisms";
import { MetaFunction } from "@remix-run/node";
import ContractProvider from "./providers/contract";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [
    { title: "Zaibatsu" },
    {
      name: "description",
      content: "Bridging the gap between decentralized and centralized currencies",
    },
  ];
};

export async function loader() {
  return json({
    ENV: {
      ZAIBATSU_SERVICE_APPLICATION_ID: process.env.ZAIBATSU_SERVICE_APPLICATION_ID,
      WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
      WALLET_CONNECT_PROJECT_NAME: process.env.WALLET_CONNECT_PROJECT_NAME,
      WALLET_CONNECT_PROJECT_DESCRIPTION: process.env.WALLET_CONNECT_PROJECT_DESCRIPTION,
      WALLET_CONNECT_PROJECT_URL: process.env.WALLET_CONNECT_PROJECT_URL,
      WALLET_CONNECT_PROJECT_ICON_URL: process.env.WALLET_CONNECT_PROJECT_ICON_URL,
      WALLET_CONNECT_PROJECT_THEME: process.env.WALLET_CONNECT_PROJECT_THEME,
      ALGORAND_ENVIRONMENT: process.env.ALGORAND_ENVIRONMENT,
      ALGORAND_ALGOD_TOKEN: process.env.ALGORAND_ALGOD_TOKEN,
      ALGORAND_ALGOD_SERVER: process.env.ALGORAND_ALGOD_SERVER,
      ALGORAND_ALGOD_PORT: process.env.ALGORAND_ALGOD_PORT,
      ALGORAND_ALGOD_NETWORK: process.env.ALGORAND_ALGOD_NETWORK,
      ALGORAND_INDEXER_TOKEN: process.env.ALGORAND_INDEXER_TOKEN,
      ALGORAND_INDEXER_SERVER: process.env.ALGORAND_INDEXER_SERVER,
      ALGORAND_INDEXER_PORT: process.env.ALGORAND_INDEXER_PORT,
    },
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter">
        <RecoilRoot>
          <WalletProvider>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ENV= ${JSON.stringify(data.ENV)}`,
              }}
            />
            {/** @ts-ignore  */}
            <ContractProvider>
              <AppShellWithNavigation>
                <Outlet />
              </AppShellWithNavigation>
            </ContractProvider>
          </WalletProvider>
        </RecoilRoot>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
