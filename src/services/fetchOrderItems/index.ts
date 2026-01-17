import { OrderItem } from '@/types/index';

export const fetchOrderItems = async (token: string, branch: string, document: string, version: string): Promise<OrderItem | string> => {
	const params = new URLSearchParams({
		branch,
		document,
		version,
	});

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/orderItems?${params.toString()}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
		});

		if (!response.ok) {
			return `Request failed with status [${response.status}] : ${response.statusText}`;
		}

		const data = await response.json();

		if (data && typeof data === 'object' && Array.isArray(data.content)) {
			return data as OrderItem;
		} else {
			return `Erro: A resposta não contém um array válido de items!`;
		}
	} catch (error: any) {
		return error.message;
	}
};
