import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Category from '@/models/Category';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const force = searchParams.get('force') === 'true';

    await connectDB();

    if (force) {
      console.log('Force resetting admin user...');
      await User.deleteOne({ email: 'admin@sargamkeys.com' });
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@sargamkeys.com' });
    
    if (adminExists && !force) {
      return NextResponse.json(
        { 
          message: 'Admin already exists.', 
          email: 'admin@sargamkeys.com',
          hint: 'To recreate, visit /api/setup?force=true' 
        },
        { status: 200 }
      );
    }

    // Create default admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@sargamkeys.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Admin created:', admin.email);

    // Create default categories if none exist
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const defaultCategories = [
        { name: 'Bollywood', order: 1 },
        { name: 'Classical', order: 2 },
        { name: 'Pop', order: 3 },
        { name: 'Devotional', order: 4 },
      ];

      for (const cat of defaultCategories) {
        await Category.create({ 
          name: cat.name, 
          slug: slugify(cat.name), 
          order: cat.order 
        });
      }
    }

    return NextResponse.json({
      message: 'Setup successful!',
      credentials: {
        email: 'admin@sargamkeys.com',
        password: 'admin123'
      },
      nextStep: 'Go to /admin and log in with these credentials.'
    });
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
