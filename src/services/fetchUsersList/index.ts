export interface User {
	id: string;
	name: string;
	email: string;
	cpf?: string;
	phone?: string;
}

export const fetchUsersList = async (): Promise<User[]> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/users/list`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error?.error || `Request failed with status [${response.status}]`);
		}

		const result = await response.json();
		return Array.isArray(result) ? result : result.data || [];
	} catch (error: any) {
		throw new Error(error.message || 'Failed to fetch users');
	}
};
