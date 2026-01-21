#!/usr/bin/env node

/**
 * Database Setup Script for Quantum Insights
 * Runs the schema SQL and creates the admin user
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SUPABASE_URL = 'https://mrqectaahvxvwegxhydz.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycWVjdGFhaHZ4dndlZ3hoeWR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTAxNTk2NywiZXhwIjoyMDg0NTkxOTY3fQ.gpX7ERFB2S-MGob7_6lZ8HTGfI7Gnv1YEf3X1ysvpxY';

// Admin user details
const ADMIN_USER_ID = 'a34e21f8-71d2-48a8-a09a-09d09fd04166';
const ADMIN_EMAIL = 'marcosmvm1515@gmail.com';
const ADMIN_NAME = 'Marcos Matthews';

async function main() {
  console.log('🚀 Setting up Quantum Insights database...\n');

  // Create Supabase client with service role
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Check if profiles table exists
  console.log('📋 Checking if database is already set up...');
  const { data: existingProfiles, error: checkError } = await supabase
    .from('profiles')
    .select('id')
    .limit(1);

  if (!checkError) {
    console.log('✅ Database tables already exist!\n');

    // Check if admin profile exists
    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', ADMIN_USER_ID)
      .single();

    if (adminProfile) {
      console.log(`👤 Admin profile found: ${adminProfile.email} (role: ${adminProfile.role})`);

      if (adminProfile.role !== 'admin') {
        console.log('🔄 Updating role to admin...');
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', ADMIN_USER_ID);

        if (updateError) {
          console.error('❌ Failed to update role:', updateError.message);
        } else {
          console.log('✅ Role updated to admin!');
        }
      }
    } else {
      console.log('⚠️  Admin profile not found, creating...');
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: ADMIN_USER_ID,
          email: ADMIN_EMAIL,
          full_name: ADMIN_NAME,
          role: 'admin'
        });

      if (insertError) {
        console.error('❌ Failed to create admin profile:', insertError.message);
      } else {
        console.log('✅ Admin profile created!');
      }
    }

    // Show summary
    await showSummary(supabase);
    return;
  }

  console.log('📦 Tables not found. Schema needs to be run in Supabase SQL Editor.\n');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('IMPORTANT: The Supabase JS client cannot run DDL statements.');
  console.log('You need to run the schema manually in the Supabase SQL Editor.');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  console.log('Steps:');
  console.log('1. Go to: https://supabase.com/dashboard/project/mrqectaahvxvwegxhydz/sql/new');
  console.log('2. Copy the contents of: supabase/schema.sql');
  console.log('3. Paste and click "Run"\n');
  console.log('After running the schema, run this script again to set up the admin user.\n');
}

async function showSummary(supabase) {
  console.log('\n📊 Database Summary:');
  console.log('─────────────────────');

  // Count records in each table
  const tables = ['profiles', 'organizations', 'campaigns', 'leads', 'subscriptions'];

  for (const table of tables) {
    const { count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    console.log(`   ${table}: ${count || 0} records`);
  }

  console.log('\n✅ Setup complete! You can now log in at: http://localhost:3000/login');
  console.log('   Admin email: ' + ADMIN_EMAIL + '\n');
}

main().catch(console.error);
