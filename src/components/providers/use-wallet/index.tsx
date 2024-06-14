"use client";

import React from "react";
import {
	WalletProvider,
	useInitializeProviders,
	PROVIDER_ID,
} from "@txnlab/use-wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import LuteConnect from "lute-connect";

interface Props {
	children?: React.ReactNode;
}

const UseWalletProvider: React.FC<Props> = ({ children }) => {
	const providers = useInitializeProviders({
		providers: [
			{ id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
			{ id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
			{ id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
			{ id: PROVIDER_ID.EXODUS },
			{
				id: PROVIDER_ID.LUTE,
				clientStatic: LuteConnect,
				clientOptions: { siteName: "Zaibatsu" },
			},
			{ id: PROVIDER_ID.KIBISIS },
		],
	});

	return <WalletProvider value={providers}>{children}</WalletProvider>;
};

export default UseWalletProvider;
