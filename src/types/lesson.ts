export interface LessonStatus {
	lessonId: string;
	status: 'ACTIVE' | 'INACTIVE' | 'ENDED';
	startedAt: string;
	duration: number;
}
