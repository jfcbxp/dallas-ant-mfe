import { Payment } from '@/types/index';

export const fecthPayment = async (
	token: string,
	branch: string,
	document: string,
	version: string,
	type: string,
	installment: string,
): Promise<Payment | string> => {
	try {
		const url = new URL(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/payments`, window.location.origin);

		const response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
			body: JSON.stringify({
				branch,
				document,
				version,
				type,
				installment,
			}),
		});

		if (!response.ok) {
			return `Request failed with status [${response.status}] : ${response.statusText}`;
		}

		const data = await response.json();

		if (data && typeof data === 'object') {
			return data as Payment;
		} else {
			return `Erro: A resposta não contém um objeto válido de pagamento!`;
		}
	} catch (error: any) {
		return error.message;
	}
};
