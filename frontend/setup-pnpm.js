#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up pnpm...');

try {
  // Check if pnpm is already available
  try {
    execSync('pnpm --version', { stdio: 'pipe' });
    console.log('✅ pnpm is already available');
    process.exit(0);
  } catch (e) {
    console.log('pnpm not found, attempting to install...');
  }

  // Try to enable corepack (available in Node.js 16.10+)
  try {
    console.log('Enabling corepack...');
    execSync('corepack enable', { stdio: 'inherit' });
    
    console.log('Preparing pnpm...');
    execSync('corepack prepare pnpm@latest --activate', { stdio: 'inherit' });
    
    console.log('✅ pnpm installed via corepack');
  } catch (e) {
    console.log('Corepack failed, trying npm install...');
    
    // Fallback: install via npm
    try {
      execSync('npm install -g pnpm', { stdio: 'inherit' });
      console.log('✅ pnpm installed via npm');
    } catch (e) {
      console.log('❌ Failed to install pnpm via npm');
      console.log('Manual installation required. Please run: npm install -g pnpm');
      process.exit(1);
    }
  }

  // Test pnpm installation
  try {
    const version = execSync('pnpm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ pnpm version ${version} is now available`);
  } catch (e) {
    console.log('❌ pnpm installation verification failed');
    process.exit(1);
  }

} catch (error) {
  console.error('Error during pnpm setup:', error.message);
  process.exit(1);
}