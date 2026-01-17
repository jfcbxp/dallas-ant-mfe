export const fetchMe = async (token: string): Promise<string> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/me`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
		});

		if (!response.ok) {
			return `Request failed with status [${response.status}] : ${response.statusText}`;
		} else {
			return 'ok';
		}
	} catch (error: any) {
		return error.message;
	}
};
