const TRANSACTION_PERCENTAGE = 1;

export function calculateTransactionFee(amount: number): number {
	const calced = (TRANSACTION_PERCENTAGE / 100) * amount;
	console.log({ calced });
	return calced;
}

export function calcAmountPlusFee(amount: number): number {
	const fee = calculateTransactionFee(amount);
	return fee + amount;
}
