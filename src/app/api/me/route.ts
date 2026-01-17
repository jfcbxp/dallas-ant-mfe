import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const token = req.headers.get('authorization');

		const apiBaseUrl = process.env.API_BASE_URL || '';

		if (!token) {
			return NextResponse.json({ error: 'Authorization token missing' }, { status: 401 });
		}

		const response = await fetch(`${apiBaseUrl}/auth/me`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			cache: 'no-store',
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ error: data?.message || 'Failed to fetch user info' }, { status: response.status });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
	}
}
