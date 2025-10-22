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
    // Test basic query to check connection
    const { data, error } = await supabase
      .from('kv_store_5723645c')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`❌ Database connection failed: ${error.message}`);
      return false;
    } else {
      console.log('   ✅ Database connection successful');
      console.log(`   📊 Found ${data ? data.length : 0} records in kv_store table`);
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
    // Test getting current user (should be null if not authenticated)
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log(`   ❌ Authentication test failed: ${error.message}`);
      return false;
    } else {
      console.log(`   ✅ Authentication service accessible`);
      console.log(`   👤 Current user: ${user ? user.email : 'Not authenticated'}`);
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
    const { data, error } = await serviceSupabase
      .from('kv_store_5723645c')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`   ❌ Service role test failed: ${error.message}`);
      return false;
    } else {
      console.log('   ✅ Service role key works correctly');
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

