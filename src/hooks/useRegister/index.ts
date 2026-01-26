import { useMutation } from '@tanstack/react-query';
import { fetchRegister, RegisterData, RegisterResponse } from '@/services/fetchRegister';

export const useRegister = () => {
	return useMutation<RegisterResponse, Error, RegisterData>({
		mutationFn: fetchRegister,
	});
};
