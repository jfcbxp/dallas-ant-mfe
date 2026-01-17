import { Order } from '@/types/index';

export const fetchPayments = async (
	token: string,
	page?: number,
	status?: string,
	type?: string,
	startDate?: string,
	endDate?: string,
): Promise<Order | string> => {
	try {
		const url = new URL(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/payments`, window.location.origin);
		const params: Record<string, string> = {};
		if (startDate && endDate) {
			params.startDate = startDate;
			params.endDate = endDate;
		}
		if (type) {
			params.type = type;
		}
		if (status) {
			params.status = status;
		}
		if (page) {
			params.page = page.toString();
		}

		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		const response = await fetch(url.toString(), {
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
			return data as Order;
		} else {
			return `Erro: A resposta não contém um array válido de boletos!`;
		}
	} catch (error: any) {
		return error.message;
	}
};
