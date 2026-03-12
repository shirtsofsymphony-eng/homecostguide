import { createClient } from '@supabase/supabase-js';

// These come from your Supabase project settings
// Dashboard → Settings → API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================
// DATA FETCHING HELPERS
// Used at build time (getStaticProps) to pull data for pages
// ============================================================

export async function getContractorsByMetroAndCategory(metroSlug, categorySlug) {
  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('metro_slug', metroSlug)
    .contains('categories', [categorySlug])
    .order('google_rating', { ascending: false })
    .order('review_count', { ascending: false });

  if (error) console.error('Error fetching contractors:', error);
  return data || [];
}

export async function getContractorsByMetro(metroSlug) {
  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('metro_slug', metroSlug)
    .order('google_rating', { ascending: false })
    .limit(100);

  if (error) console.error('Error fetching contractors:', error);
  return data || [];
}

export async function getCostData(serviceSlug, metroSlug) {
  const { data, error } = await supabase
    .from('cost_data')
    .select('*')
    .eq('service_slug', serviceSlug)
    .eq('metro_slug', metroSlug)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching cost data:', error);
  }
  return data || null;
}

export async function getPageContent(pageType, serviceSlug, metroSlug) {
  const { data, error } = await supabase
    .from('page_content')
    .select('*')
    .eq('page_type', pageType)
    .eq('service_slug', serviceSlug || '')
    .eq('metro_slug', metroSlug || '')
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching page content:', error);
  }
  return data || null;
}

export async function getContractorCount(metroSlug) {
  const { count, error } = await supabase
    .from('contractors')
    .select('*', { count: 'exact', head: true })
    .eq('metro_slug', metroSlug);

  if (error) console.error('Error counting contractors:', error);
  return count || 0;
}

export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) console.error('Error fetching blog posts:', error);
  return data || [];
}
