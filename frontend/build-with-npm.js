#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Building project with npm fallback...');

try {
  // First, try to install pnpm if it's not available
  try {
    execSync('pnpm --version', { stdio: 'pipe' });
    console.log('✅ pnpm is available, using pnpm...');
    
    // Use pnpm
    console.log('📦 Installing dependencies with pnpm...');
    execSync('pnpm install', { stdio: 'inherit' });
    
    console.log('🔨 Building project with pnpm...');
    execSync('pnpm build', { stdio: 'inherit' });
    
  } catch (e) {
    console.log('⚠️  pnpm not available, falling back to npm...');
    
    // Check if package-lock.json exists, if not, install with npm
    console.log('📦 Installing dependencies with npm...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('🔨 Building project with npm...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}