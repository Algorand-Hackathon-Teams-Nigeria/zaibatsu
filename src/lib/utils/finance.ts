const TRANSACTION_PERCENTAGE = 0.5

export function calculateTransactionFee(amount: number): number {
  return Math.ceil((TRANSACTION_PERCENTAGE / 100) * amount)
}

export function calcAmountPlusFee(amount: number): number {
  const fee = calculateTransactionFee(amount)
  return Math.ceil(fee + amount);
}
