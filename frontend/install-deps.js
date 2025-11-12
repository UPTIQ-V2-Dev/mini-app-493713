#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Installing dependencies and building project...');

try {
  // First check if node_modules exists
  const nodeModulesExists = fs.existsSync('./node_modules');
  
  if (!nodeModulesExists) {
    console.log('📦 Installing dependencies with npm...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
  } else {
    console.log('✅ Dependencies already installed');
  }

  // Try to build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Error during installation/build:', error.message);
  console.log('\n💡 Trying alternative approach...');
  
  try {
    // Clean install
    console.log('🧹 Cleaning node_modules...');
    if (fs.existsSync('./node_modules')) {
      execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });
    }
    
    console.log('📦 Fresh npm install...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
    
    console.log('🔨 Building again...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Successfully built with alternative approach!');
  } catch (altError) {
    console.error('❌ Alternative approach also failed:', altError.message);
    process.exit(1);
  }
}

console.log('🎉 Project is ready!');