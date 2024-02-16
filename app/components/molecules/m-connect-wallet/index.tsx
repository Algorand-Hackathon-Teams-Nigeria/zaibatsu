import { WalletAddress, WalletProvider } from "@components/atoms";
import { useWallet } from "@txnlab/use-wallet";
import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import React from "react";

const ConnectWallet = () => {
  const [open, setOpen] = React.useState(false);
  const { providers, activeAccount } = useWallet();
  const connectedProvider = providers?.find((provider) => provider.isActive);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          variant="outline"
          type="button"
          className="md:p-8 md:rounded-l-[40px] text-lg"
          size="lg"
        >
          {activeAccount ? (
            <WalletAddress address={activeAccount.address} truncate />
          ) : (
            "Connect Wallet"
          )}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="p-7 px-4 w-full md:max-w-[680px] md:px-16 overflow-y-auto max-w-[90vw]">
        <Dialog.Header className="w-full flex flex-col items-center">
          <Dialog.Title className="py-4 flex items-center justify-center font-semibold text-2xl">
            {activeAccount ? "Connected Wallet" : "Connect Wallet"}
          </Dialog.Title>
          {!activeAccount && (
            <Dialog.Description className="text-center md:max-w-[70%] flex items-center justify-center text-sm">
              Connect to any of the supported wallet providers to start trading
              on Zaibatsu
            </Dialog.Description>
          )}
        </Dialog.Header>
        <div className="flex flex-col w-full items-center mt-5">
          {!activeAccount ? (
            <ul className="grid grid-cols-1 w-full md:grid-cols-2 gap-14 gap-y-4 md:gap-y-7">
              {providers?.map((provider) => (
                <WalletProvider
                  onClick={() => setOpen(false)}
                  key={provider.metadata.id}
                  provider={provider}
                />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex border rounded-lg p-1 items-center gap-4">
                {connectedProvider && (
                  <img
                    className="w-7 h-7 rounded-md"
                    src={connectedProvider.metadata.icon}
                    alt={connectedProvider.metadata.name}
                  />
                )}
                <WalletAddress
                  truncate
                  copyable
                  address={activeAccount.address}
                />
              </div>
              <Button
                onClick={() => {
                  connectedProvider?.disconnect();
                  setOpen(false);
                }}
                variant="destructive"
                type="button"
              >
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ConnectWallet;
