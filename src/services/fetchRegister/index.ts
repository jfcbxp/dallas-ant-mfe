export interface RegisterData {
	name: string;
	height: number;
	weight: number;
	birthDate: string;
	gender: string;
}

export interface RegisterResponse {
	id: string;
	name: string;
	email: string;
	message?: string;
}

export const fetchRegister = async (data: RegisterData): Promise<RegisterResponse> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/register`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error?.error || `Request failed with status [${response.status}]`);
		}

		const result = await response.json();
		return result;
	} catch (error: any) {
		throw new Error(error.message || 'Failed to register');
	}
};
