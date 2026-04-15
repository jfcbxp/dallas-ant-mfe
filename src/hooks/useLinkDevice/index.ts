import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LinkDeviceResponse } from '@/types/user';
import { fetchLinkDevice } from '@/services/fetchLinkDevice';

interface LinkDeviceVariables {
	deviceId: number;
	userId: string;
}

export const useLinkDevice = () => {
	const queryClient = useQueryClient();

	return useMutation<LinkDeviceResponse, Error, LinkDeviceVariables>({
		mutationFn: ({ deviceId, userId }) => fetchLinkDevice(deviceId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['availableDevices'] });
			queryClient.invalidateQueries({ queryKey: ['usersList'] });
		},
	});
};
