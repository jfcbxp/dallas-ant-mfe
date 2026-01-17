export interface CnD {
	code: string;
	description: string;
}

export interface Order {
	days: CnD[];
	types: CnD[];
	status: CnD[];
	content: GroupedOrders[];
	elements: number;
	totalElements: number;
	page: number;
	totalPages: number;
}

export interface GroupedOrders {
	groupId: string;
	description: string;
	orders: OrderContent[];
}

export interface OrderContent {
	id: number;
	branch: string;
	branchDescription: string;
	document: string;
	version: string;
	installment: string;
	type: string;
	typeDescription: string;
	barcode: string;
	digcode: string;
	date: string;
	invoiceDate: string;
	invoiceWorkingDate: string;
	paymentDate: string;
	amount: number;
	product: string;
	quantity: number;
	balance: number;
	status: string;
	image: string;
	items?: OrderItem;
}

export interface OrderItem {
	content: OrderItemContent[];
	totalElements: number;
}

export interface OrderItemContent {
	id: number;
	branch: string;
	document: string;
	version: string;
	product: string;
	description: string;
	item: string;
	quantity: number;
	price: number;
	total: number;
	image?: string;
}

export interface Payment {
	balance: number;
	discount: number;
	fee: number;
	tax: number;
	amount: number;
	total: number;
	pix: string;
}
