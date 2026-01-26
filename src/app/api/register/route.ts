import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { name, height, weight, birthDate, gender } = await req.json();

		const apiBaseUrl = process.env.API_BASE_URL || '';

		const response = await fetch(`${apiBaseUrl}/usuarios`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				height,
				weight,
				birthDate,
				gender,
			}),
			cache: 'no-store',
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ error: data?.message || 'Registration failed' }, { status: response.status });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
	}
}
