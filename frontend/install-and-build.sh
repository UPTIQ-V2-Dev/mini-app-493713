#!/bin/bash
set -e

echo "🚀 Installing pnpm and building project..."

# Function to install pnpm
install_pnpm() {
    echo "📦 Installing pnpm..."
    
    # Try different methods to install pnpm
    if command -v corepack >/dev/null 2>&1; then
        echo "Using corepack to install pnpm..."
        corepack enable
        corepack prepare pnpm@latest --activate
    elif command -v npm >/dev/null 2>&1; then
        echo "Using npm to install pnpm globally..."
        npm install -g pnpm
    else
        echo "❌ Neither corepack nor npm found. Cannot install pnpm."
        exit 1
    fi
}

# Check if pnpm is available
if ! command -v pnpm >/dev/null 2>&1; then
    echo "⚠️  pnpm not found, installing..."
    install_pnpm
    
    # Update PATH to include pnpm
    export PATH="$PATH:$(npm config get prefix)/bin"
    export PATH="$PATH:$HOME/.local/share/pnpm"
else
    echo "✅ pnpm is already available"
fi

# Verify pnpm is working
if command -v pnpm >/dev/null 2>&1; then
    echo "✅ pnpm version: $(pnpm --version)"
    
    echo "📦 Installing dependencies..."
    pnpm install
    
    echo "🔨 Building project..."
    pnpm build
    
    echo "✅ Build completed successfully!"
else
    echo "❌ pnpm installation failed, falling back to npm..."
    echo "📦 Installing dependencies with npm..."
    npm install
    
    echo "🔨 Building project with npm..."
    npm run build
    
    echo "✅ Build completed with npm!"
fi