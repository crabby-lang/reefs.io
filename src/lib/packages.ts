// MongoDB connection and package management utilities
import { MongoClient, Db, Collection } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'reefs_io';
const PACKAGES_COLLECTION = 'packages';

interface Package {
  _id?: string;
  name: string;
  version: string;
  description: string;
  author: string;
  downloads: number;
  category: string;
  badge: string;
  language: string;
  homepage?: string;
  repository?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Connect to MongoDB
async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    cachedDb = client.db(DATABASE_NAME);
    console.log('Connected to MongoDB');
    return cachedDb;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function getPackagesCollection(): Promise<Collection<Package>> {
  const db = await connectToDatabase();
  return db.collection<Package>(PACKAGES_COLLECTION);
}

export async function getAllPackages(): Promise<Package[]> {
  try {
    const collection = await getPackagesCollection();
    const packages = await collection.find({}).toArray();
    return packages;
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export async function getPackagesByCategory(category: string): Promise<Package[]> {
  try {
    const collection = await getPackagesCollection();
    const packages = await collection.find({ category }).toArray();
    return packages;
  } catch (error) {
    console.error('Error fetching packages by category:', error);
    return [];
  }
}

export async function getPackageByName(name: string): Promise<Package | null> {
  try {
    const collection = await getPackagesCollection();
    const pkg = await collection.findOne({ name });
    return pkg;
  } catch (error) {
    console.error('Error fetching package:', error);
    return null;
  }
}

export async function getTotalPackageCount(): Promise<number> {
  try {
    const collection = await getPackagesCollection();
    const count = await collection.countDocuments();
    return count;
  } catch (error) {
    console.error('Error getting package count:', error);
    return 0;
  }
}

export async function getPackageCountByCategory(category: string): Promise<number> {
  try {
    const collection = await getPackagesCollection();
    const count = await collection.countDocuments({ category });
    return count;
  } catch (error) {
    console.error('Error getting package count by category:', error);
    return 0;
  }
}

export async function getTopDownloadedPackages(limit: number = 10): Promise<Package[]> {
  try {
    const collection = await getPackagesCollection();
    const packages = await collection
      .find({})
      .sort({ downloads: -1 })
      .limit(limit)
      .toArray();
    return packages;
  } catch (error) {
    console.error('Error fetching top packages:', error);
    return [];
  }
}

export async function upsertPackage(pkg: Package): Promise<Package | null> {
  try {
    const collection = await getPackagesCollection();
    const result = await collection.findOneAndUpdate(
      { name: pkg.name },
      { $set: { ...pkg, updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );
    return result || null;
  } catch (error) {
    console.error('Error upserting package:', error);
    return null;
  }
}

export async function incrementPackageDownloads(name: string): Promise<void> {
  try {
    const collection = await getPackagesCollection();
    await collection.updateOne(
      { name },
      { $inc: { downloads: 1 }, $set: { updatedAt: new Date() } }
    );
  } catch (error) {
    console.error('Error incrementing downloads:', error);
  }
}

export async function deletePackage(name: string): Promise<boolean> {
  try {
    const collection = await getPackagesCollection();
    const result = await collection.deleteOne({ name });
    return result.deletedCount === 1;
  } catch (error) {
    console.error('Error deleting package:', error);
    return false;
  }
}

// Get statistics
export async function getPackageStatistics(): Promise<{
  totalPackages: number;
  categories: { [key: string]: number };
  topPackages: Package[];
}> {
  try {
    const collection = await getPackagesCollection();
    const totalPackages = await collection.countDocuments();
    const topPackages = await collection
      .find({})
      .sort({ downloads: -1 })
      .limit(5)
      .toArray();

    const categories = await collection.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]).toArray();

    const categoryMap: { [key: string]: number } = {};
    categories.forEach((cat: any) => {
      categoryMap[cat._id || 'Other'] = cat.count;
    });

    return {
      totalPackages,
      categories: categoryMap,
      topPackages
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return {
      totalPackages: 0,
      categories: {},
      topPackages: []
    };
  }
}

export async function closeDatabase(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
