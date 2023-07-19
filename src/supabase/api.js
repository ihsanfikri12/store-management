import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ibdwmbpvvvcfdnxqcsdj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZHdtYnB2dnZjZmRueHFjc2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3MzM2MDIsImV4cCI6MjAwNTMwOTYwMn0.3Eg7P7BkyPmdAvuXdIN_-T4rNowRRTQ7qMkCounNK3U';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
