import { useQuery } from '@tanstack/react-query';
import { User, fetchUsersList } from '@/services/fetchUsersList';

export const useUsersList = () => {
	return useQuery<User[], Error>({
		queryKey: ['usersList'],
		queryFn: fetchUsersList,
		staleTime: 60000,
	});
};
