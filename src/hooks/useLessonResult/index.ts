import { useQuery } from '@tanstack/react-query';
import { LessonResult } from '@/types/lessonResult';
import { fetchLessonResult } from '@/services/fetchLessonResult';

export const useLessonResult = (enabled: boolean) => {
	return useQuery<LessonResult, Error>({
		queryKey: ['lessonResult'],
		queryFn: fetchLessonResult,
		enabled,
		refetchInterval: enabled ? 5000 : false,
		refetchIntervalInBackground: true,
		staleTime: 0,
	});
};
