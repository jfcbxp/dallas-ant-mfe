export interface UserData {
	id: string;
	name: string;
	gender?: string;
	weight?: number;
	height?: number;
	birthDate?: string;
	createdAt?: string;
	updatedAt?: string;
	deviceId?: number;
}

export interface HeartRateData {
	deviceId: number;
	heartRate: number;
	beatTime: number;
	beatCount: number;
	manufacturerId: number | null;
	serialNumber: number | null;
	stickId: number;
	receivedAt: string;
	user?: UserData;
}

export interface ZoneStats {
	zone: string;
	label: string;
	count: number;
	range: string;
	color: string;
}
