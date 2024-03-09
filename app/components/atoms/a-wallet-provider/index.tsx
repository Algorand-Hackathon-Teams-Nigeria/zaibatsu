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
      className="h-20 w-full xmd:h-autox flex xmd:flex-colx xmd:justify-centerx aspect-square items-center gap-6 xmd:gap-2x p-3 rounded-[5.76px] xmd:rounded-[30px]x font-medium bg-[#305030]/60 hover:bg-black/20  transition-all"
    >
      <img
        className="aspect-square h-full xmd:h-autox  max-w-40 rounded-full"
        src={provider.metadata.icon}
        alt={`${provider.metadata.name} icon`}
      />
      <span className="text-[17.28px]">{provider.metadata.name}</span>
    </button>
  );
};

export default WalletProvider;
