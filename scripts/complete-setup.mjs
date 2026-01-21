#!/usr/bin/env node

/**
 * Complete Setup Script for Quantum Insights
 * Opens browser to all necessary setup pages
 */

import { exec } from 'child_process';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = 'https://mrqectaahvxvwegxhydz.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycWVjdGFhaHZ4dndlZ3hoeWR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTAxNTk2NywiZXhwIjoyMDg0NTkxOTY3fQ.gpX7ERFB2S-MGob7_6lZ8HTGfI7Gnv1YEf3X1ysvpxY';

const ADMIN_USER_ID = 'a34e21f8-71d2-48a8-a09a-09d09fd04166';
const ADMIN_EMAIL = 'marcosmvm1515@gmail.com';
const ADMIN_NAME = 'Marcos Matthews';

function openUrl(url) {
  const command = process.platform === 'darwin' ? 'open' :
                  process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${command} "${url}"`);
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function checkDatabase() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .limit(1);

  return !error;
}

async function setupAdminProfile() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Check if profile exists
  const { data: existing } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', ADMIN_USER_ID)
    .single();

  if (existing) {
    if (existing.role !== 'admin') {
      await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', ADMIN_USER_ID);
      console.log('✅ Updated role to admin');
    } else {
      console.log('✅ Admin profile already exists');
    }
    return true;
  }

  // Create profile
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: ADMIN_USER_ID,
      email: ADMIN_EMAIL,
      full_name: ADMIN_NAME,
      role: 'admin'
    });

  if (error) {
    console.error('❌ Failed to create profile:', error.message);
    return false;
  }

  console.log('✅ Admin profile created');
  return true;
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║       QUANTUM INSIGHTS - COMPLETE SETUP WIZARD                ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Step 1: Check database
  console.log('📋 Step 1: Database Setup');
  console.log('─────────────────────────');

  const dbExists = await checkDatabase();

  if (!dbExists) {
    console.log('⚠️  Database tables not found.\n');
    console.log('Opening Supabase SQL Editor in your browser...');
    console.log('Copy the contents of: supabase/schema.sql');
    console.log('Paste into the SQL Editor and click "Run"\n');

    openUrl('https://supabase.com/dashboard/project/mrqectaahvxvwegxhydz/sql/new');

    // Copy schema to clipboard on Mac
    if (process.platform === 'darwin') {
      const schemaPath = join(__dirname, '..', 'supabase', 'schema.sql');
      const schema = readFileSync(schemaPath, 'utf-8');
      exec(`echo "${schema.replace(/"/g, '\\"')}" | pbcopy`, (error) => {
        if (!error) {
          console.log('📋 Schema SQL copied to clipboard!\n');
        }
      });
    }

    await ask('Press Enter after you have run the schema in Supabase...');

    // Re-check
    const dbNowExists = await checkDatabase();
    if (!dbNowExists) {
      console.log('❌ Tables still not found. Please run the schema first.');
      return;
    }
  }

  console.log('✅ Database tables exist!\n');

  // Step 2: Admin profile
  console.log('👤 Step 2: Admin Profile');
  console.log('────────────────────────');

  await setupAdminProfile();
  console.log('');

  // Step 3: Stripe Keys
  console.log('💳 Step 3: Stripe Configuration');
  console.log('────────────────────────────────');

  const envPath = join(__dirname, '..', '.env.local');
  let envContent = readFileSync(envPath, 'utf-8');

  if (!envContent.includes('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_')) {
    console.log('\nOpening Stripe API Keys page...');
    console.log('Copy the "Publishable key" (starts with pk_live_ or pk_test_)\n');
    openUrl('https://dashboard.stripe.com/apikeys');

    const publishableKey = await ask('Paste your Stripe Publishable Key: ');

    if (publishableKey.startsWith('pk_')) {
      envContent = envContent.replace(
        'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=',
        `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${publishableKey}`
      );
      writeFileSync(envPath, envContent);
      console.log('✅ Publishable key saved!\n');
    }
  } else {
    console.log('✅ Stripe Publishable Key already configured\n');
  }

  // Step 4: Check webhook secret
  console.log('🔗 Step 4: Stripe Webhook');
  console.log('─────────────────────────');

  if (!envContent.includes('STRIPE_WEBHOOK_SECRET=whsec_')) {
    console.log('\nNote: Webhook configuration is needed for production.');
    console.log('After deploying to Vercel, configure webhook at:');
    console.log('→ https://dashboard.stripe.com/webhooks\n');
    console.log('Endpoint URL: https://your-domain.vercel.app/api/stripe/webhook');
    console.log('Events: checkout.session.completed, invoice.paid, invoice.payment_failed,');
    console.log('        customer.subscription.updated, customer.subscription.deleted\n');
  } else {
    console.log('✅ Stripe Webhook Secret configured\n');
  }

  // Step 5: Deploy
  console.log('🚀 Step 5: Deployment');
  console.log('─────────────────────');

  const shouldDeploy = await ask('\nWould you like to deploy to Vercel now? (y/n): ');

  if (shouldDeploy.toLowerCase() === 'y') {
    console.log('\nStarting Vercel deployment...\n');

    // Check if Vercel CLI is installed
    exec('which vercel', (error) => {
      if (error) {
        console.log('Installing Vercel CLI...');
        exec('npm install -g vercel', (installError) => {
          if (installError) {
            console.log('❌ Could not install Vercel CLI. Please install manually: npm install -g vercel');
          } else {
            exec('cd ' + join(__dirname, '..') + ' && vercel', { stdio: 'inherit' });
          }
        });
      } else {
        const { spawn } = await import('child_process');
        const deploy = spawn('vercel', [], {
          cwd: join(__dirname, '..'),
          stdio: 'inherit'
        });
      }
    });
  } else {
    console.log('\nTo deploy later, run: vercel');
    console.log('Or push to GitHub and connect to Vercel for auto-deploys.\n');
  }

  // Summary
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                      SETUP COMPLETE!                          ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  console.log('📍 Local Development: npm run dev → http://localhost:3000');
  console.log('📍 Admin Login: ' + ADMIN_EMAIL);
  console.log('📍 Dashboard: /admin (admin) or /dashboard (clients)\n');
}

main().catch(console.error);
