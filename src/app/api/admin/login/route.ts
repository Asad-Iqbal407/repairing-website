import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { usernameOrEmail, password } = await request.json();

    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { error: 'Username/email and password are required' },
        { status: 400 }
      );
    }

    const adminData = await AuthService.authenticateAdmin(usernameOrEmail, password);

    if (!adminData) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = AuthService.generateToken(adminData);

    // Create response with token in cookie
    const response = NextResponse.json(
      {
        message: 'Login successful',
        admin: adminData
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}