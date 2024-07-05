import crypto from "crypto";

export function getMultiplierForDecimalPlaces(decimalPlaces: number) {
	return Math.pow(10, decimalPlaces);
}

const FEE_PERCENTAGE = 0.5;

export function calcAmountPlusFee(amount: number): number {
	const feeDecimal = FEE_PERCENTAGE / 100;
	const percentage = feeDecimal * amount;
	return percentage + amount;
}

export function generateObjectHash(obj: Record<string, any>): string {
	const hash = crypto
		.createHash("sha256")
		.update(JSON.stringify(obj))
		.digest("hex");
	return hash;
}

export function encodeIdToBase64(loanId: number): string {
	const idBytes = Buffer.allocUnsafe((loanId.toString(2).length + 7) >> 3);
	idBytes.writeUIntBE(loanId, 0, idBytes.length);
	const base64Str = idBytes
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
	return base64Str;
}

export function decodeBase64ToId(encodedId: string): number {
	const padding = "=".repeat((4 - (encodedId.length % 4)) % 4);
	const base64Str = encodedId.replace(/-/g, "+").replace(/_/g, "/") + padding;
	const idBytes = Buffer.from(base64Str, "base64");
	const loanId = idBytes.readUIntBE(0, idBytes.length);
	return loanId;
}
