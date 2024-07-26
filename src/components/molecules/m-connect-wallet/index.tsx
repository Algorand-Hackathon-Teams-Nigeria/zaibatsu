"use client";

import React from "react";
import { useWallet } from "@txnlab/use-wallet";
import Image from "next/image";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import PhSealCheckFill from "~icons/ph/seal-check-fill.jsx";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import IconParkOutlineCopy from "~icons/icon-park-outline/copy.jsx";
import { ellipseAddress } from "@/lib/utils/text";
import { useToast } from "@/components/ui/use-toast";

const ConnectWallet = () => {
	const { providers, activeAccount, activeAddress } = useWallet();

	const { toast } = useToast();

	const copyAddress = React.useCallback(() => {
		window.navigator.clipboard.writeText(activeAddress ?? "");
		toast({
			description: "Address copied to clipboard",
		});
	}, [activeAddress, toast]);

	return (
		<div>
			<div className="py-8 space-y-2">
				{!activeAddress ? (
					<>
						<h2 className="font-semibold text-xl">Connect Wallet</h2>
						<p className="text-muted-foreground">
							Connect to any of our supported wallets to transact securely on
							Zaibatsu
						</p>
					</>
				) : (
					<div className="flex items-center justify-between gap-4 font-semibold">
						<span>{ellipseAddress(activeAddress, 12)}</span>
						<Button
							type="button"
							onClick={copyAddress}
							size="icon"
							variant="outline"
						>
							<IconParkOutlineCopy />
							<span className="sr-only">Copy address</span>
						</Button>
					</div>
				)}
			</div>
			<Accordion type="single" collapsible>
				{providers?.map((provider) => (
					<AccordionItem
						value={provider.metadata.id}
						key={provider.metadata.id}
					>
						<AccordionTrigger>
							<h4 className="flex items-center font-semibold gap-3 text-lg relative">
								<Image
									width={50}
									height={50}
									className="rounded-2xl"
									alt={`${provider.metadata.name} icon`}
									src={provider.metadata.icon}
								/>
								<span>{provider.metadata.name}</span>
								{provider.isActive && (
									<div className="text-primary absolute -top-2 -left-2">
										<PhSealCheckFill />
										<span className="sr-only">Active</span>
									</div>
								)}
							</h4>
						</AccordionTrigger>
						<AccordionContent>
							<div>
								<div className="flex p-2 gap-2 items-center">
									<Button
										type="button"
										variant="secondary"
										size="sm"
										onClick={provider.connect}
									>
										Connect
									</Button>
									{provider.isConnected && (
										<Button
											size="sm"
											variant="destructive"
											type="button"
											onClick={provider.disconnect}
										>
											Disconnect
										</Button>
									)}
									{!(!provider.isConnected || provider.isActive) && (
										<Button
											variant="ghost"
											type="button"
											onClick={provider.setActiveProvider}
										>
											Set Active
										</Button>
									)}
								</div>
								<div className="px-2">
									{provider.isActive && provider.accounts.length && (
										<Select
											value={activeAccount?.address}
											onValueChange={(v) => provider.setActiveAccount(v)}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select an account" />
											</SelectTrigger>
											<SelectContent>
												{provider.accounts.map((account) => (
													<SelectItem
														key={account.address}
														value={account.address}
													>
														{ellipseAddress(account.address, 12)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default ConnectWallet;
