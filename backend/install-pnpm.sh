#!/bin/bash
# Install pnpm locally
curl -fsSL https://get.pnpm.io/install.sh | bash
export PATH="$HOME/.local/share/pnpm:$PATH"
pnpm install
pnpm db:generate
pnpm typecheck