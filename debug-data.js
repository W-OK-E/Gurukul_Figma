const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
    console.log('--- COURSES ---');
    const { data: courses, error: cErr } = await supabase.from('courses').select('*');
    if (cErr) console.error('Course Error:', cErr);
    else console.log('Count:', courses?.length || 0, courses);

    console.log('\n--- PROFILES ---');
    const { data: profiles, error: pErr } = await supabase.from('profiles').select('*');
    if (pErr) console.error('Profile Error:', pErr);
    else console.log('Count:', profiles?.length || 0, profiles);
}

debug();
