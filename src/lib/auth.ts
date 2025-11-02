import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export interface JWTPayload {
  adminId: string;
  username: string;
  email: string;
  role: string;
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  static async createAdmin(adminData: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<any> {
    const hashedPassword = await this.hashPassword(adminData.password);

    const admin = new Admin({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role || 'admin',
    });

    return admin.save();
  }

  static async authenticateAdmin(usernameOrEmail: string, password: string): Promise<JWTPayload | null> {
    const admin = await Admin.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ],
      isActive: true
    });

    if (!admin) {
      return null;
    }

    const isValidPassword = await this.verifyPassword(password, admin.password);
    if (!isValidPassword) {
      return null;
    }

    // Update last login
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

    return {
      adminId: admin._id.toString(),
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };
  }

  static async getAdminById(adminId: string): Promise<any> {
    return Admin.findById(adminId).select('-password');
  }

  static async updateAdminStatus(adminId: string, isActive: boolean): Promise<any> {
    return Admin.findByIdAndUpdate(adminId, { isActive }, { new: true }).select('-password');
  }
}