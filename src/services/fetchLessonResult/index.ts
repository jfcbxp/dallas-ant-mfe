import { LessonResult } from '@/types/lessonResult';

export const fetchLessonResult = async (): Promise<LessonResult> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/lesson/result`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return response.json();
};
