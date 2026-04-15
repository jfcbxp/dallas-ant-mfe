import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';
import { fetchUsersList } from '@/services/fetchUsersList';

export const useUsersList = () => {
	return useQuery<User[], Error>({
		queryKey: ['usersList'],
		queryFn: fetchUsersList,
		staleTime: 60000,
	});
};
