import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const apiBaseUrl = process.env.API_BASE_URL || '';
		const response = await fetch(`${apiBaseUrl}/lesson/start`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to start lesson: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error: any) {
		console.error('Error starting lesson:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
