import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Get the cookie header for authentication
    const cookieHeader = request.headers.get('cookie')

    // Forward the request to the backend
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    const response = await fetch(`${backendUrl}/transactions/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Deposit failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Deposit API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
