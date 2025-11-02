import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication and superadmin role
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = AuthService.verifyToken(token);
    if (!payload || payload.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Superadmin access required' },
        { status: 403 }
      );
    }

    // Connect to database
    await connectToDatabase();

    const { username, email, password, role } = await request.json();

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Create admin
    const admin = await AuthService.createAdmin({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role || 'admin',
    });

    return NextResponse.json(
      {
        message: 'Admin created successfully',
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating admin:', error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}