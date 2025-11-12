#!/usr/bin/env node
// Wrapper script to use npm when pnpm is not available

const { spawn } = require('child_process');
const process = require('process');

// Map pnpm commands to npm equivalents
const args = process.argv.slice(2);
let npmArgs = ['npm'];

if (args.length === 0 || args[0] === 'install') {
  npmArgs.push('install');
} else if (args[0] === 'build') {
  npmArgs = ['npm', 'run', 'build'];
} else if (args[0] === 'dev') {
  npmArgs = ['npm', 'run', 'dev'];  
} else if (args[0] === 'preview') {
  npmArgs = ['npm', 'run', 'preview'];
} else if (args[0] === 'eslint') {
  npmArgs = ['npm', 'run', 'eslint'];
} else {
  npmArgs.push(...args);
}

// Remove 'npm' from the beginning as spawn expects just the args
const command = npmArgs.shift();
const child = spawn(command, npmArgs, { 
  stdio: 'inherit',
  shell: true 
});

child.on('exit', (code) => {
  process.exit(code);
});