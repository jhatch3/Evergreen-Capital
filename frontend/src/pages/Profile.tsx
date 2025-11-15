import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from '@/components/ui/card';
import { LineChart } from '@/components/charts/LineChart';
import { Wallet, Calendar, TrendingUp, PieChart } from 'lucide-react';
import { userProfile, navHistory } from '@/lib/mockData';

const Profile = () => {
  const { publicKey } = useWallet();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-solana bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Personal vault statistics and performance
          </p>
        </div>

        {/* Wallet Info Card */}
        <Card className="glass-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-solana-glow flex items-center justify-center">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Wallet Address</div>
              <div className="font-mono text-lg">
                {publicKey ? publicKey.toString() : 'Not Connected'}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Total Deposited</span>
              </div>
              <div className="text-3xl font-bold">{userProfile.totalDeposited} SOL</div>
              <div className="text-sm text-muted-foreground">
                ${userProfile.totalDepositedUSD.toLocaleString()} USD
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Deposit Date</span>
              </div>
              <div className="text-2xl font-semibold">{userProfile.depositDate}</div>
              <div className="text-sm text-muted-foreground">
                {userProfile.daysInVault} days in vault
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <PieChart className="w-4 h-4" />
                <span className="text-sm">Vault Ownership</span>
              </div>
              <div className="text-3xl font-bold">{userProfile.vaultSharePercent}%</div>
              <div className="text-sm text-muted-foreground">
                {userProfile.vaultShares.toFixed(4)} shares
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Estimated Yield</span>
              </div>
              <div className="text-3xl font-bold text-green-500">+{userProfile.estimatedYieldPercent}%</div>
              <div className="text-sm text-muted-foreground">
                +{userProfile.estimatedYieldSOL} SOL
              </div>
            </div>
          </div>
        </Card>

        {/* Personal NAV Chart */}
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-semibold mb-6">Your NAV Over Time</h3>
          <LineChart
            data={navHistory}
            dataKey="nav"
            xAxisKey="date"
            color="hsl(270 91% 65%)"
            height={280}
          />
        </Card>

        {/* Agent Commentary */}
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-semibold mb-4">AI Agent Commentary</h3>
          <div className="space-y-4">
            {userProfile.agentCommentary.map((comment, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-primary">{comment.agent}</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-foreground/90">{comment.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
