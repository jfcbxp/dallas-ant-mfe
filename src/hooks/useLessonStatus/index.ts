import { useQuery } from '@tanstack/react-query';
import { LessonStatus } from '@/types/lesson';
import { fetchLessonStatus } from '@/services/fetchLessonStatus';

export const useLessonStatus = () => {
	return useQuery<LessonStatus, Error>({
		queryKey: ['lessonStatus'],
		queryFn: fetchLessonStatus,
		refetchInterval: 1000,
		refetchIntervalInBackground: true,
		staleTime: 0,
	});
};
