import { LoanTemplateFormSchema } from "@molecules/m-loan-template-form/schema";
import ATOM_KEYS from "../keys";
import { atomWithLocalStorage } from "../utils";

const loanTemplateFormAtom = atomWithLocalStorage<
	LoanTemplateFormSchema | undefined
>(ATOM_KEYS.LOAN_TEMPLATE_FORM, undefined);

export default loanTemplateFormAtom;
