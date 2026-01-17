import { useQuery } from '@tanstack/react-query';
import { OrderItem } from '@/types/index';
import { fetchOrderItems } from 'src/services/fetchOrderItems';

export function useOrderItemsQuery({
	token,
	branch,
	document,
	version,
	enabled = true,
}: {
	token: string;
	branch: string;
	document: string;
	version: string;
	enabled?: boolean;
}) {
	return useQuery<OrderItem, Error>({
		queryKey: ['orderItems', token, branch, document, version],
		queryFn: async () => {
			const result = await fetchOrderItems(token, branch, document, version);
			if (typeof result === 'string') {
				throw new Error(result);
			}
			return result;
		},
		enabled: enabled && !!token && !!branch && !!document && !!version,
		staleTime: 1000 * 60 * 60,
		refetchOnWindowFocus: false,
	});
}
