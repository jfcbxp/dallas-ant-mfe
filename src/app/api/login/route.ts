import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { id, password } = await req.json();

		const apiBaseUrl = process.env.API_BASE_URL || '';

		const response = await fetch(`${apiBaseUrl}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, password }),
			cache: 'no-store',
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ error: data?.message || 'Login failed' }, { status: response.status });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
	}
}
