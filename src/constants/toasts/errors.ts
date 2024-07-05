import { GraphQLError } from "graphql";
import { ToastData } from "./types";

const ERRORS = {
  WALLET_DISCONNECTED: {
    title: "Active address not found",
    description: "Please connect your wallet to continue",
    variant: "destructive",
  } as ToastData,
  SERVER_ERROR: (error: GraphQLError): ToastData => {
    return {
      title: error.name,
      description: error.message,
      variant: "destructive",
    };
  },
  CONTRACT_CALL_FAILED: {
    title: "Transaction Failed",
    description: "Failed to call contract method",
    variant: "destructive",
  } as ToastData,
} as const;

export default ERRORS;
