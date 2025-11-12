#!/bin/bash
# Install pnpm if it's not already installed

if ! command -v pnpm &> /dev/null; then
    echo "pnpm not found. Installing..."
    
    # Try using npm to install pnpm globally
    npm install -g pnpm
    
    # Add pnpm to PATH if needed
    export PATH="$PATH:$(npm config get prefix)/bin"
    
    echo "pnpm installed successfully"
else
    echo "pnpm is already installed"
fi

# Now run the commands
pnpm install
pnpm build