import { useQuery } from '@tanstack/react-query';
import { Device } from '@/types/device';
import { fetchAvailableDevices } from '@/services/fetchAvailableDevices';

export const useAvailableDevices = () => {
	return useQuery<Device[], Error>({
		queryKey: ['availableDevices'],
		queryFn: fetchAvailableDevices,
		staleTime: 1000,
	});
};
