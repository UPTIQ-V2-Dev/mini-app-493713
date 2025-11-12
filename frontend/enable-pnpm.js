#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🔧 Enabling pnpm through corepack...');

try {
  // Set environment variables like in Dockerfile
  process.env.PNPM_HOME = "/pnpm";
  process.env.PATH = `/pnpm:${process.env.PATH}`;
  
  console.log('📦 Enabling corepack...');
  execSync('corepack enable', { stdio: 'inherit' });
  
  console.log('⚡ Preparing pnpm...');
  execSync('corepack prepare pnpm@latest --activate', { stdio: 'inherit' });
  
  console.log('✅ Testing pnpm installation...');
  const version = execSync('pnpm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ pnpm version ${version} is now available!`);
  
  // Now install dependencies
  console.log('📦 Installing dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });
  
  // Build the project
  console.log('🔨 Building project...');
  execSync('pnpm build', { stdio: 'inherit' });
  
  console.log('✅ Project built successfully!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  
  console.log('\n🔄 Falling back to npm...');
  try {
    console.log('📦 Installing with npm...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('🔨 Building with npm...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Built successfully with npm!');
  } catch (npmError) {
    console.error('❌ npm fallback also failed:', npmError.message);
    process.exit(1);
  }
}