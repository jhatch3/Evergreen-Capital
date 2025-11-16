#!/usr/bin/env bash
set -euo pipefail

# Rebuild + deploy the vault program, initialize a new vault instance,
# and patch deposit/withdraw scripts with the fresh addresses.
# Usage: ./scripts/refresh_vault.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Rebuilding vault..."
anchor build -p vault

echo "Deploying vault..."
anchor deploy -p vault

echo "Initializing vault..."
INIT_OUT="$(anchor run init_vault)"
echo "$INIT_OUT"

# Parse addresses from init_vault output
vault_config=$(echo "$INIT_OUT" | awk '/^vault_config: /{print $2}')
underlying_mint=$(echo "$INIT_OUT" | awk '/^underlying_mint: /{print $2}')
vault_underlying=$(echo "$INIT_OUT" | awk '/^vault_underlying: /{print $2}')
share_mint=$(echo "$INIT_OUT" | awk '/^share_mint: /{print $2}')

if [[ -z "$vault_config" || -z "$underlying_mint" || -z "$vault_underlying" || -z "$share_mint" ]]; then
  echo "Failed to parse init_vault output; aborting."
  exit 1
fi

echo "Patching scripts/deposit.ts and scripts/withdraw.ts with new addresses..."
node - "$vault_config" "$underlying_mint" "$vault_underlying" "$share_mint" <<'NODECODE'
const fs = require('fs');
const files = ['scripts/deposit.ts', 'scripts/withdraw.ts'];
const [vaultConfig, underlyingMint, vaultUnderlying, shareMint] = process.argv.slice(2);

function patch(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const patched = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('const VAULT_CONFIG')) {
      return `const VAULT_CONFIG = new anchor.web3.PublicKey('${vaultConfig}');`;
    }
    if (trimmed.startsWith('const UNDERLYING_MINT')) {
      return `const UNDERLYING_MINT = new anchor.web3.PublicKey('${underlyingMint}');`;
    }
    if (trimmed.startsWith('const VAULT_UNDERLYING')) {
      return `const VAULT_UNDERLYING = new anchor.web3.PublicKey('${vaultUnderlying}');`;
    }
    if (trimmed.startsWith('const SHARE_MINT')) {
      return `const SHARE_MINT = new anchor.web3.PublicKey('${shareMint}');`;
    }
    return line;
  });
  fs.writeFileSync(file, patched.join('\n'));
  console.log(`Patched ${file}`);
}

files.forEach(patch);
NODECODE

echo "Done. Now run: anchor run deposit"
