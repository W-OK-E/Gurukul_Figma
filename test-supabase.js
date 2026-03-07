const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase Connection...\n');

// Test 1: Check environment variables
console.log('1. Environment Variables Check:');
console.log(`   SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
console.log(`   SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`);
console.log(`   SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ Set' : '❌ Missing'}\n`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('❌ Missing required environment variables. Cannot proceed with tests.');
  process.exit(1);
}

// Test 2: Create Supabase client
console.log('2. Creating Supabase Client...');
const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('   ✅ Supabase client created successfully\n');

// Test 3: Test database connection
console.log('3. Testing Database Connection...');
async function testDatabaseConnection() {
  try {
    // Test basic query to check connection (system tables usually exist)
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .limit(1);

    if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
      console.log(`❌ Database connection failed: ${error.message}`);
      return false;
    } else {
      console.log('   ✅ Database connection successful');
      if (error && error.code === '42P01') {
        console.log('   📊 Note: Connection works, but "courses" table doesn\'t exist yet (needs migration).');
      }
      return true;
    }
  } catch (err) {
    console.log(`   ❌ Database connection error: ${err.message}`);
    return false;
  }
}

// Test 4: Test authentication
console.log('4. Testing Authentication...');
async function testAuthentication() {
  try {
    // In a script, we expect to be "Not authenticated"
    const { data: { user }, error } = await supabase.auth.getUser();

    // "Auth session missing" is the expected response when not logged in
    if (error && error.message !== 'Auth session missing!') {
      console.log(`   ❌ Authentication service error: ${error.message}`);
      return false;
    } else {
      console.log(`   ✅ Authentication service is REACHABLE`);
      console.log(`   👤 Status: ${user ? 'Logged in as ' + user.email : 'No active session (Expected)'}`);
      return true;
    }
  } catch (err) {
    console.log(`   ❌ Authentication error: ${err.message}`);
    return false;
  }
}

// Test 5: Test service role key
console.log('5. Testing Service Role Key...');
async function testServiceRole() {
  if (!supabaseServiceKey) {
    console.log('   ⚠️  Service role key not available for testing');
    return false;
  }

  try {
    const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);
    // Use a generic query that doesn't rely on a specific table existing
    const { data, error } = await serviceSupabase.from('profiles').select('count');

    if (error && error.code !== '42P01') { // 42P01 is "table does not exist"
      console.log(`   ❌ Service role key failed: ${error.message}`);
      return false;
    } else {
      console.log('   ✅ Service role key is VALID (God Mode Active)');
      return true;
    }
  } catch (err) {
    console.log(`   ❌ Service role error: ${err.message}`);
    return false;
  }
}

// Run all tests
async function runTests() {
  const dbConnected = await testDatabaseConnection();
  const authWorking = await testAuthentication();
  const serviceRoleWorking = await testServiceRole();

  console.log('\n📋 Test Summary:');
  console.log(`   Database Connection: ${dbConnected ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Authentication: ${authWorking ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Service Role: ${serviceRoleWorking ? '✅ PASS' : '❌ FAIL'}`);

  if (dbConnected && authWorking) {
    console.log('\n🎉 Supabase is properly configured and working!');
  } else {
    console.log('\n⚠️  Some issues detected. Check the errors above.');
  }
}

runTests().catch(console.error);

