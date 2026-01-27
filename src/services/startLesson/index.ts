export const startLesson = async (): Promise<void> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/lesson/start`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to start lesson: ${response.status}`);
	}
};
