import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';

export const WalletConnectButton = () => {
  const { connected, publicKey } = useWallet();

  return (
    <div className="flex items-center gap-4">
      {connected && publicKey && (
        <div className="hidden md:flex flex-col items-end gap-1">
          <div className="text-sm text-muted-foreground">Connected Wallet</div>
          <div className="flex items-center gap-2 text-sm font-mono">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-foreground">
              {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            ~5.23 SOL • ~$523 USDC
          </div>
        </div>
      )}
      <WalletMultiButton className="!bg-gradient-solana hover-glow-primary !rounded-lg !h-10 !px-6 !font-medium !transition-all" />
    </div>
  );
};
