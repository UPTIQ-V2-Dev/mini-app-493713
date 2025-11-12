#!/usr/bin/env node

const { spawn } = require('child_process');
const args = process.argv.slice(2);

// Map pnpm commands to npm equivalents
let npmCommand = ['npm'];

switch (args[0]) {
  case 'install':
    npmCommand.push('install');
    break;
  case 'build':
    npmCommand = ['npm', 'run', 'build'];
    break;
  case 'dev':
    npmCommand = ['npm', 'run', 'dev'];
    break;
  case 'preview':
    npmCommand = ['npm', 'run', 'preview'];
    break;
  case 'eslint':
    npmCommand = ['npm', 'run', 'eslint'];
    break;
  case 'prettier':
    npmCommand = ['npm', 'run', 'prettier'];
    break;
  case 'add':
    npmCommand.push('install');
    npmCommand.push(...args.slice(1));
    break;
  case 'remove':
    npmCommand.push('uninstall');
    npmCommand.push(...args.slice(1));
    break;
  default:
    if (args.length > 0 && args[0].startsWith('add:')) {
      npmCommand.push('install');
      npmCommand.push(...args.slice(1));
    } else if (args.length > 0 && args[0].startsWith('remove:')) {
      npmCommand.push('uninstall');
      npmCommand.push(...args.slice(1));
    } else {
      npmCommand.push(...args);
    }
}

const command = npmCommand.shift();
const child = spawn(command, npmCommand, { 
  stdio: 'inherit',
  shell: true 
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Error executing command:', err.message);
  process.exit(1);
});