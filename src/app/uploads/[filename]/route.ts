import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const filepath = path.join(process.cwd(), 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read file
    const fileBuffer = fs.readFileSync(filepath);

    // Get file extension to determine content type
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';

    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.webp') {
      contentType = 'image/webp';
    }

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });

  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}