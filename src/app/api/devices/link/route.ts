import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { deviceId, userId } = await req.json();

		const apiBaseUrl = process.env.API_BASE_URL || '';

		const response = await fetch(`${apiBaseUrl}/pulseiras/vincular-pulseira`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId, deviceId }),
			cache: 'no-store',
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ error: data?.message || 'Failed to link device' }, { status: response.status });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
	}
}
