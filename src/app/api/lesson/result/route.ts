import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const apiBaseUrl = process.env.API_BASE_URL || '';
		const response = await fetch(`${apiBaseUrl}/lesson/result`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch lesson result: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error: any) {
		console.error('Error fetching lesson result:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
