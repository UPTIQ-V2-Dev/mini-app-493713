# PNPM Setup Guide

## Problem
You're encountering the error: `pnpm failed: spawn pnpm ENOENT`

This happens because pnpm is not installed on your system.

## Solutions

### Option 1: Install pnpm globally (Recommended)

```bash
# Using npm
npm install -g pnpm

# Using corepack (Node.js 16.10+)
corepack enable
corepack prepare pnpm@latest --activate

# Using curl (Unix systems)
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Option 2: Use npx to run pnpm commands

```bash
# Install dependencies
npx pnpm install

# Build the project
npx pnpm build

# Run development server
npx pnpm dev
```

### Option 3: Use npm instead of pnpm

Since this project has a standard package.json, you can use npm:

```bash
# Install dependencies
npm install

# Build the project  
npm run build

# Run development server
npm run dev
```

### Option 4: Run the automated setup script

```bash
# Make the script executable and run it
chmod +x install-and-build.sh
./install-and-build.sh
```

## Verification

After installation, verify pnpm works:

```bash
pnpm --version
```

You should see a version number like `8.x.x` or similar.

## Project Commands

Once pnpm is installed, you can use these commands:

```bash
pnpm install       # Install dependencies
pnpm build         # Build for production
pnpm dev           # Start development server
pnpm preview       # Preview production build
pnpm eslint        # Run linting
```

## Alternative: Modify Scripts

If you prefer to stick with npm, you can modify the package.json scripts to use npm instead of pnpm throughout the project.