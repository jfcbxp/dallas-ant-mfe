import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const response = await fetch('http://localhost:3000/lesson/end', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to end lesson: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error: any) {
		console.error('Error ending lesson:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
