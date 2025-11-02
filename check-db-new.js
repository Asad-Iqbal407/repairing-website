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

async function checkContacts() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://meiqbal2002_db_user:0wCb6pnLWq8lyMeR@cluster0.lpueci9.mongodb.net/repairingservices?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to database');

    const contacts = await Contact.find({}).select('name images').limit(10);
    console.log(`Found ${contacts.length} contacts:`);

    contacts.forEach((c, index) => {
      console.log(`${index + 1}. Name: ${c.name}, Images: ${c.images ? c.images.length : 0}`);
      if (c.images && c.images.length > 0) {
        c.images.forEach((img, imgIndex) => {
          console.log(`   Image ${imgIndex + 1}: ${img.filename}, URL: ${img.url}`);
        });
      }
    });

    await mongoose.disconnect();
    console.log('Disconnected from database');
  } catch (e) {
    console.error('Error:', e.message);
    console.error('Full error:', e);
  }
}

checkContacts();
