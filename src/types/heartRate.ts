export interface HeartRateData {
	deviceId: number;
	heartRate: number;
	beatTime: number;
	beatCount: number;
	manufacturerId: number | null;
	serialNumber: number | null;
	stickId: number;
	receivedAt: string;
}

export interface ZoneStats {
	zone: string;
	label: string;
	count: number;
	range: string;
	color: string;
}
