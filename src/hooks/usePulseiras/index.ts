import { useQuery } from '@tanstack/react-query';
import { HeartRateData } from '@/types/heartRate';
import { fetchPulseiras } from '@/services/fetchPulseiras';

export const usePulseiras = () => {
	return useQuery<HeartRateData[], Error>({
		queryKey: ['pulseiras'],
		queryFn: fetchPulseiras,
		refetchInterval: 1000,
		refetchIntervalInBackground: true,
		staleTime: 0,
	});
};
