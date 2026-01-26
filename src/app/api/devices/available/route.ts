import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
	try {
		const apiBaseUrl = process.env.API_BASE_URL || '';

		const response = await fetch(`${apiBaseUrl}/ant/disponiveis/todas`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json({ error: data?.message || 'Failed to fetch devices' }, { status: response.status });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
	}
}
