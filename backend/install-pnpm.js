#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Installing pnpm...');
  
  // Try to use corepack first
  try {
    execSync('corepack enable', { stdio: 'inherit' });
    execSync('corepack prepare pnpm@10.14.0 --activate', { stdio: 'inherit' });
    console.log('✅ pnpm installed via corepack');
  } catch (error) {
    console.log('Corepack not available, trying npm...');
    // Fallback to npm installation
    execSync('npm install -g pnpm@10.14.0', { stdio: 'inherit' });
    console.log('✅ pnpm installed via npm');
  }
  
  // Now install dependencies
  console.log('Installing dependencies...');
  execSync('pnpm install', { stdio: 'inherit', cwd: __dirname });
  
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('pnpm db:generate', { stdio: 'inherit', cwd: __dirname });
  
  // Run typecheck
  console.log('Running typecheck...');
  execSync('pnpm typecheck', { stdio: 'inherit', cwd: __dirname });
  
  console.log('✅ Setup complete!');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}