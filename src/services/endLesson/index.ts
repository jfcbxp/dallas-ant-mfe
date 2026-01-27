export const endLesson = async (): Promise<void> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/lesson/end`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to end lesson: ${response.status}`);
	}
};
