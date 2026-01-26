import { useQuery } from '@tanstack/react-query';
import { Device, fetchAvailableDevices } from '@/services/fetchAvailableDevices';

export const useAvailableDevices = () => {
	return useQuery<Device[], Error>({
		queryKey: ['availableDevices'],
		queryFn: fetchAvailableDevices,
		staleTime: 1000,
	});
};
