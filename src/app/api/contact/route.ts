import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API called');

    // Connect to database
    await connectToDatabase();

    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const deviceType = formData.get('deviceType') as string;
    const serviceType = formData.get('serviceType') as string;
    const message = formData.get('message') as string;

    // Get uploaded files
    const files = formData.getAll('images') as File[];
    console.log(`Received ${files.length} files`);

    // Validate required fields
    if (!name || !email || !phone || !deviceType || !serviceType || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate file count (max 3 images)
    if (files.length > 3) {
      return NextResponse.json(
        { error: 'Maximum 3 images allowed' },
        { status: 400 }
      );
    }

    // Process uploaded images
    const imageData: any[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        console.log(`Processing file: ${file.name}, size: ${file.size}, type: ${file.type}`);

        // Validate file type
        if (!file.type.startsWith('image/')) {
          return NextResponse.json(
            { error: 'Only image files are allowed' },
            { status: 400 }
          );
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: 'File size must be less than 5MB' },
            { status: 400 }
          );
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2);
        const extension = path.extname(file.name);
        const filename = `${timestamp}-${random}${extension}`;
        const filepath = path.join(uploadsDir, filename);

        // Save file to disk
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filepath, buffer);
        console.log(`File saved to: ${filepath}`);

        // Add image data
        imageData.push({
          filename,
          originalName: file.name,
          mimetype: file.type,
          size: file.size,
          url: `/uploads/${filename}`,
          uploadedAt: new Date()
        });
      }
    }

    console.log(`Processed ${imageData.length} images`);

    // Create new contact entry
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      deviceType,
      serviceType,
      message: message.trim(),
      images: imageData,
    });

    // Save to database
    const savedContact = await contact.save();
    console.log(`Contact saved with ID: ${savedContact._id}, images: ${savedContact.images.length}`);

    // Return success response
    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        contactId: savedContact._id,
        status: 'pending',
        imagesUploaded: imageData.length
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error saving contact form:', error);

    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    // Handle duplicate key errors (if email uniqueness is added later)
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'A contact with this email already exists' },
        { status: 409 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to database
    await connectToDatabase();

    // Get all contacts (you might want to add authentication/authorization for this)
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .limit(100); // Limit results for performance

    return NextResponse.json({ contacts }, { status: 200 });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
