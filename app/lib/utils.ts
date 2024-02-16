import type { EnvData } from "@/types/enviroment";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type WindowType = typeof globalThis &
  Window & {
    ENV: EnvData;
  };

/** Returns the ENV object on the window */
export function getEnv(): EnvData | undefined {
  if (typeof window !== "undefined") {
    return (window as WindowType).ENV;
  }
  return undefined;
}
export function getAlgodConfigFromEnvironment() {
  const env = getEnv();

  return {
    nodeServer:
      env?.ALGORAND_ALGOD_SERVER ?? "https://testnet-api.algonode.cloud",
    nodePort: env?.ALGORAND_ALGOD_PORT ?? "",
    nodeToken: env?.ALGORAND_ALGOD_TOKEN ?? "",
    network: env?.ALGORAND_ALGOD_NETWORK ?? "testnet",
  };
}
