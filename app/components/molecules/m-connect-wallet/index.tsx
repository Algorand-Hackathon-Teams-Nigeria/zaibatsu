import { WalletAddress, WalletProvider } from "@components/atoms";
import { useWallet } from "@txnlab/use-wallet";
import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import { returnIcon } from "@/components/ui/icon";
import React from "react";

const ConnectWallet = () => {
  const [open, setOpen] = React.useState(false);
  const { providers, activeAccount } = useWallet();
  const connectedProvider = providers?.find((provider) => provider.isActive);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          variant={!activeAccount ? "wallet" : "default"}
          type="button"
          className={
            !activeAccount
              ? `px-[42px] py-[11.5px]   text-[14px] leading-[30.25px] `
              : `bg-transparent`
          }
          size="lg"
        >
          <div className="flex flex-row items-center text-white">
            <div
              className={`w-6 h-6 text-white mr-2 flex items-center relative ${
                activeAccount && "w-[31px] h-[31px]"
              } `}
            >
              {!activeAccount
                ? returnIcon("wallet")
                : connectedProvider && (
                    <>
                      <img
                        className="rounded-full w-[31px] h-[31px] filter grayscale brightness-110"
                        src="/assets/images/avataroverlaid.png"
                        alt={connectedProvider.metadata.name}
                      />
                      {
                        <div className="absolute inset-0 bg-secondaryPool-foreground  opacity-50 rounded-full "></div>
                      }
                    </>
                  )}
            </div>
            {activeAccount ? (
              <WalletAddress address={activeAccount.address} truncate />
            ) : (
              "Connect Wallet"
            )}
          </div>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="p-7 px-4 w-full md:max-w-[680px] md:px-16 overflow-y-auto max-w-[90vw] bg-[#00380f] border-none text-white">
        <Dialog.Header className="w-full flex flex-col items-center">
          <Dialog.Title className="py-4 flex items-center justify-center font-semibold text-lg leading-[150%]">
            {activeAccount ? "Connected Wallet" : "Connect Wallet"}
          </Dialog.Title>
          {!activeAccount && (
            <Dialog.Description className="text-center md:max-w-[70%] flex items-center justify-center text-sm leading-[130%] text-white">
              Connect to any supported wallet to securely store your
              cryptocurrencies
            </Dialog.Description>
          )}
        </Dialog.Header>
        <div className="flex flex-col w-full items-center mt-5">
          {!activeAccount ? (
            <ul className="grid grid-cols-1 w-full  gap-14 gap-y-4 xmd:grid-cols-2x xmd:gap-y-7x">
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
