#!/usr/bin/env node

/**
 * Run SQL Schema directly on Supabase database
 * Uses direct Postgres connection via pg
 */

import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase database connection
// Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
// We need the database password from Supabase dashboard

// Try using the direct connection string (Transaction mode pooler)
// Project ref: mrqectaahvxvwegxhydz
// Host: db.mrqectaahvxvwegxhydz.supabase.co (direct connection)

async function main() {
  console.log('🔑 Supabase Database Schema Runner\n');

  // Check for DATABASE_URL environment variable
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log('❌ DATABASE_URL not set.\n');
    console.log('To run this script, you need to:');
    console.log('1. Go to: https://supabase.com/dashboard/project/mrqectaahvxvwegxhydz/settings/database');
    console.log('2. Copy the "Connection string" (URI format)');
    console.log('3. Run: DATABASE_URL="your-connection-string" node scripts/run-schema.mjs\n');
    console.log('Alternatively, run the schema directly in the SQL Editor:');
    console.log('→ https://supabase.com/dashboard/project/mrqectaahvxvwegxhydz/sql/new\n');

    // Try to help by opening the browser
    console.log('📋 Schema file location: supabase/schema.sql');
    console.log('   Copy its contents and paste into the SQL Editor.\n');
    return;
  }

  console.log('📡 Connecting to database...');

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected!\n');

    // Read schema file
    const schemaPath = join(__dirname, '..', 'supabase', 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    console.log('📦 Running schema (this may take a moment)...\n');

    // Execute schema
    await client.query(schema);

    console.log('✅ Schema executed successfully!\n');

    // Verify tables were created
    const { rows } = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('📋 Created tables:');
    rows.forEach(row => console.log(`   - ${row.table_name}`));

    // Insert admin profile
    console.log('\n👤 Setting up admin profile...');

    const adminResult = await client.query(`
      INSERT INTO public.profiles (id, email, full_name, role)
      VALUES (
        'a34e21f8-71d2-48a8-a09a-09d09fd04166',
        'marcosmvm1515@gmail.com',
        'Marcos Matthews',
        'admin'
      )
      ON CONFLICT (id) DO UPDATE SET role = 'admin'
      RETURNING *;
    `);

    console.log('✅ Admin profile ready:', adminResult.rows[0].email);

    console.log('\n🎉 Database setup complete!');
    console.log('   You can now log in at: http://localhost:3000/login');

  } catch (error) {
    console.error('❌ Error:', error.message);

    if (error.message.includes('already exists')) {
      console.log('\n⚠️  Some objects already exist. This is fine if running the schema again.');
    }
  } finally {
    await client.end();
  }
}

main();
