import React from "react";
import { BsCopy } from "react-icons/bs";

interface Props {
  address: string;
  truncate?: boolean;
  copyable?: boolean;
}

function truncateAddress(address: string, isMobile: boolean = false) {
  const sliceValue: number = isMobile ? 3 : 10;
  return `${address.slice(0, sliceValue)}...${address.slice(-sliceValue)}`;
}

const WalletAddress: React.FC<Props> = ({ address, truncate, copyable }) => {
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address);
    }
  };
  return (
    <div className="flex items-center gap-3">
      <span className="hidden md:block">{truncate ? truncateAddress(address) : address}</span>
      <span className="block md:hidden">{truncate ? truncateAddress(address, true) : address}</span>

      {copyable && (
        <button
          title="Copy Address"
          className="shadow p-1 hover:bg-black/10 transition-all rounded"
          onClick={copyToClipboard}
          type="button"
        >
          <BsCopy size={24} />
        </button>
      )}
    </div>
  );
};

export default WalletAddress;
