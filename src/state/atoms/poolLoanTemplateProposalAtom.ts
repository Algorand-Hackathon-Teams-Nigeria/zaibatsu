import { PoolLoanTemplateProposalFormSchema } from "@/components/molecules/m-pool-loan-template-proposal-form/schema";
import ATOM_KEYS from "../keys";
import { atomWithLocalStorage } from "../utils";

const loanTemplateFormAtom = atomWithLocalStorage<PoolLoanTemplateProposalFormSchema | undefined>(
  ATOM_KEYS.POOL_LOAN_TEMPLATE_PROPOSAL_FORM,
  undefined,
);

export default loanTemplateFormAtom;
