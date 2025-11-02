const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  deviceType: String,
  serviceType: String,
  message: String,
  images: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String,
    uploadedAt: Date
  }],
  status: String,
  createdAt: Date,
  updatedAt: Date
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

async function createTestContact() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://meiqbal2002_db_user:0wCb6pnLWq8lyMeR@cluster0.lpueci9.mongodb.net/repairingservices?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to database');

    // Create a test contact with sample images
    const testContact = new Contact({
      name: 'Test User with Images',
      email: 'test@example.com',
      phone: '+1234567890',
      deviceType: 'mobile',
      serviceType: 'screen-repair',
      message: 'This is a test contact with images to verify the functionality.',
      images: [
        {
          filename: '1762093348154-h0n54judde5.jpg',
          originalName: 'test-image-1.jpg',
          mimetype: 'image/jpeg',
          size: 1024000,
          url: '/uploads/1762093348154-h0n54judde5.jpg',
          uploadedAt: new Date()
        },
        {
          filename: '1762093878146-x9brfkj6yke.jpg',
          originalName: 'test-image-2.jpg',
          mimetype: 'image/jpeg',
          size: 2048000,
          url: '/uploads/1762093878146-x9brfkj6yke.jpg',
          uploadedAt: new Date()
        }
      ],
      status: 'pending'
    });

    const savedContact = await testContact.save();
    console.log(`Test contact created with ID: ${savedContact._id}`);
    console.log(`Images: ${savedContact.images.length}`);

    await mongoose.disconnect();
    console.log('Disconnected from database');
  } catch (e) {
    console.error('Error:', e.message);
    console.error('Full error:', e);
  }
}

createTestContact();
