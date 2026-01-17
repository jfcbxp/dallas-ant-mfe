import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const branch = searchParams.get('branch');
	const document = searchParams.get('document');
	const version = searchParams.get('version');
	const token = req.headers.get('authorization');
	const apiBaseUrl = process.env.API_BASE_URL || '';

	if (!branch || !document || !version || !token) {
		return NextResponse.json({ error: 'Missing parameters or token' }, { status: 400 });
	}

	const backendUrl = new URL(`${apiBaseUrl}/orders`);
	backendUrl.searchParams.append('branch', branch);
	backendUrl.searchParams.append('document', document);
	backendUrl.searchParams.append('version', version);

	const response = await fetch(backendUrl.toString(), {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
	});

	const data = await response.json();
	return NextResponse.json(data, { status: response.status });
}
