import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const apiPath = path.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `https://api.taostats.io/api/${apiPath}${searchParams ? '?' + searchParams : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': process.env.TAOSTATS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Taostats API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Taostats proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Taostats API' },
      { status: 500 }
    );
  }
}