import { useQuery } from '@tanstack/react-query';
import { LessonStatus, fetchLessonStatus } from '@/services/fetchLessonStatus';

export const useLessonStatus = () => {
	return useQuery<LessonStatus, Error>({
		queryKey: ['lessonStatus'],
		queryFn: fetchLessonStatus,
		refetchInterval: 3000,
		refetchIntervalInBackground: true,
		staleTime: 1000,
	});
};
