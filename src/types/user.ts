export interface User {
	id: string;
	name: string;
	email: string;
	cpf?: string;
	phone?: string;
}

export interface RegisterData {
	name: string;
	height: number;
	weight: number;
	birthDate: string;
	gender: string;
}

export interface RegisterResponse {
	id: string;
	name: string;
	email: string;
	message?: string;
}

export interface LinkDeviceResponse {
	success: boolean;
	message?: string;
	deviceId?: number;
	userId?: string;
}
