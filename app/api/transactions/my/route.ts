import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get the cookie header for authentication
    const cookieHeader = request.headers.get('cookie')

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    // Forward the request to the backend
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const url = `${backendUrl}/transactions/my${
      queryString ? `?${queryString}` : ''
    }`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch transactions' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Get transactions API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
