import { Provider } from "@txnlab/use-wallet";
import React from "react";

interface Props {
  provider: Provider;
  onClick?: () => void;
}

const WalletProvider: React.FC<Props> = ({ provider, onClick }) => {
  const handleClick = () => {
    provider.connect();
    if (onClick) onClick();
  };
  return (
    <button
      disabled={provider.isConnected}
      onClick={handleClick}
      className="h-20 w-full md:h-auto flex md:flex-col md:justify-center aspect-square items-center gap-4 md:gap-2 p-3 rounded-3xl md:rounded-[30px] font-medium hover:bg-black/20 transition-all"
    >
      <img
        className="aspect-square h-full md:h-auto max-w-40 rounded-full"
        src={provider.metadata.icon}
        alt={`${provider.metadata.name} icon`}
      />
      <span className="text-xl">{provider.metadata.name}</span>
    </button>
  );
};

export default WalletProvider;
