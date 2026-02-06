export interface UserData {
	id: string;
	name: string;
	gender?: 'M' | 'F';
	weight?: number;
	height?: number;
	birthDate?: string;
	createdAt?: string;
	updatedAt?: string;
	deviceId?: number;
	zones?: {
		zone1: { min: number; max: number };
		zone2: { min: number; max: number };
		zone3: { min: number; max: number };
		zone4: { min: number; max: number };
		zone5: { min: number; max: number };
	};
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
