import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'Your Supabase Url';
const supabaseKey = 'Your Supabase Key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
