export interface UserInfo {
	id: string;
	name: string;
	gender?: string;
	weight?: number;
	height?: number;
	birthDate?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Device {
	deviceId: number;
	heartRate?: number;
	beatTime?: number;
	beatCount?: number;
	manufacturerId?: number | null;
	serialNumber?: number | null;
	stickId?: number;
	receivedAt?: string;
	user?: UserInfo;
}
