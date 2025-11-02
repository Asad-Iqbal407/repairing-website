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
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/repairing');
    const contacts = await Contact.find({}).select('name images').limit(5);
    console.log('Contacts with images:');
    contacts.forEach(c => {
      console.log(`Name: ${c.name}, Images: ${c.images ? c.images.length : 0}`);
      if (c.images && c.images.length > 0) {
        c.images.forEach(img => console.log(`  - ${img.filename}, URL: ${img.url}`));
      }
    });
    await mongoose.disconnect();
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkContacts();
