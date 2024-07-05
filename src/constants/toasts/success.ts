import { ToastData } from "./types";

const SUCCESS = {
  POOL_CONTRIBUTION_COMPLETE: (
    amount: number,
    asset_unit_name: string,
  ): ToastData => {
    return {
      title: "Contribution Successfull",
      description: `Your contribution of ${amount}${asset_unit_name} is complete`,
      variant: "default",
    };
  },
} as const;

export default SUCCESS;
