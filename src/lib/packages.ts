// Supabase connection and package management utilities
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface Package {
  id?: string;
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
  created_at?: string;
  updated_at?: string;
}

export async function getAllPackages(): Promise<Package[]> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export async function getPackagesByCategory(category: string): Promise<Package[]> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('category', category);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching packages by category:', error);
    return [];
  }
}

export async function getPackageByName(name: string): Promise<Package | null> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('name', name)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching package:', error);
    return null;
  }
}

export async function getTotalPackageCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('packages')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting package count:', error);
    return 0;
  }
}

export async function getPackageCountByCategory(category: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('packages')
      .select('*', { count: 'exact', head: true })
      .eq('category', category);
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting package count by category:', error);
    return 0;
  }
}

export async function getTopDownloadedPackages(limit: number = 10): Promise<Package[]> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('downloads', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching top packages:', error);
    return [];
  }
}

export async function upsertPackage(pkg: Package): Promise<Package | null> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .upsert({ ...pkg, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error upserting package:', error);
    return null;
  }
}

export async function incrementPackageDownloads(name: string): Promise<void> {
  try {
    const pkg = await getPackageByName(name);
    if (pkg) {
      await supabase
        .from('packages')
        .update({ downloads: (pkg.downloads || 0) + 1, updated_at: new Date().toISOString() })
        .eq('name', name);
    }
  } catch (error) {
    console.error('Error incrementing downloads:', error);
  }
}

export async function deletePackage(name: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('name', name);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting package:', error);
    return false;
  }
}

export async function getPackageStatistics(): Promise<{
  totalPackages: number;
  categories: { [key: string]: number };
  topPackages: Package[];
}> {
  try {
    const totalPackages = await getTotalPackageCount();
    const topPackages = await getTopDownloadedPackages(5);
    const { data: packages, error } = await supabase.from('packages').select('category');
    
    if (error) throw error;
    
    const categoryMap: { [key: string]: number } = {};
    packages?.forEach((pkg: any) => {
      const cat = pkg.category || 'Other';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    return { totalPackages, categories: categoryMap, topPackages };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return { totalPackages: 0, categories: {}, topPackages: [] };
  }
}
