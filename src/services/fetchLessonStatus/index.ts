export interface LessonStatus {
	lessonId: string;
	status: 'ACTIVE' | 'INACTIVE' | 'ENDED';
	startedAt: string;
	duration: number;
}

export const fetchLessonStatus = async (): Promise<LessonStatus> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/lesson/status`;

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
		return result;
	} catch (error: any) {
		throw new Error(error.message || 'Failed to fetch lesson status');
	}
};
