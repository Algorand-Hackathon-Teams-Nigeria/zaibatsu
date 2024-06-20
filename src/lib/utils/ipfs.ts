export const generateUrlFromIpfsHash = (hash: string): string => {
  const gateWay = process.env.NEXT_PUBLIC_PINYATA_GATEWAY_URL ?? "";
  return `${gateWay}/ipfs/${hash}`;
};
