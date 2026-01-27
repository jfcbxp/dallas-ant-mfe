export interface LessonResultUser {
	id: string;
	name: string;
	gender: string;
	weight: number;
	height: number;
	birthDate: string;
	createdAt: string;
	updatedAt: string;
}

export interface DeviceResult {
	deviceId: number;
	user: LessonResultUser;
	totalHeartRateRecords: number;
	zones: {
		zone1: number;
		zone2: number;
		zone3: number;
		zone4: number;
		zone5: number;
	};
	points: number;
	avgHeartRate: number;
}

export interface LessonResult {
	lessonId: string;
	totalDevices: number;
	deviceResults: DeviceResult[];
	totalPoints: number;
	duration: number;
}
