require('dotenv').config({ path: '/home/w-ok-e/Documents/Gurukul/Gurukul_Fig/.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing Supabase URL or Service Role Key in .env.local');
    console.log('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE) are set.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedAdmin() {
    const email = 'admin@gurukul.com';
    const password = 'adminpassword123';

    console.log(`Attempting to create admin user: ${email}`);

    // 1. Create Auth User
    let userId;
    const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { first_name: 'Admin', last_name: 'User' }
    });

    if (createError) {
        console.log('Auth user creation failed (likely exists):', createError.message);
        // Try to get the user ID if they exist
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        const existingUser = users?.find(u => u.email === email);
        if (existingUser) {
            userId = existingUser.id;
            console.log(`Found existing user ID: ${userId}`);
        } else {
            console.error('Could not find existing user ID.');
            return;
        }
    } else {
        userId = user.id;
        console.log(`Created new auth user ID: ${userId}`);
    }

    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        console.error("Error fetching schema:", error);
    } else {
        console.log("Users table schema:\n", data);
    }
    // 2. Insert/Update into users table
    if (userId) {
        const { error: upsertError } = await supabase
            .from('users')
            .upsert({
                id: userId,
                email: email,
                userType: 'admin',
                firstname: 'Admin', // Matching the schema typo
                lastname: 'User',
                grade: null,
                parentEmail: 'N/A',
            });

        if (upsertError) {
            console.error('Error upserting into users table:', upsertError);
        } else {
            console.log('Successfully configured admin user in "users" table.');
        }
    }
}

seedAdmin();
