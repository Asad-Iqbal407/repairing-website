import connectToDatabase from '../lib/mongodb';
import { AuthService } from '../lib/auth';

async function createSuperAdmin() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();

    console.log('Creating superadmin account...');
    const admin = await AuthService.createAdmin({
      username: 'superadmin',
      email: 'admin@repairing.com',
      password: 'admin123',
      role: 'superadmin',
    });

    console.log('Superadmin created successfully!');
    console.log('Username: superadmin');
    console.log('Email: admin@repairing.com');
    console.log('Password: admin123');
    console.log('Role: superadmin');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating superadmin:', error);
    process.exit(1);
  }
}

createSuperAdmin();