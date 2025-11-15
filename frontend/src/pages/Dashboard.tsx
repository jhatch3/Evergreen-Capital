import { MetricCard } from '@/components/MetricCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { Card } from '@/components/ui/card';
import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react';
import { 
  vaultStats, 
  navHistory, 
  marketAllocations, 
  pnlHistogram,
  currentPositions 
} from '@/lib/mockData';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-solana bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Real-time vault performance and AI trading activity
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Value Locked"
          value={`$${vaultStats.totalValueLocked.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="24h: +$14,293"
        />
        <MetricCard
          title="Number of Depositors"
          value={vaultStats.numberOfDepositors.toLocaleString()}
          icon={Users}
          subtitle="Active participants"
        />
        <MetricCard
          title="Strategy Win Rate"
          value={`${vaultStats.strategyWinRate}%`}
          icon={TrendingUp}
          trend="up"
          trendValue="Last 30 days"
        />
        <MetricCard
          title="24h PnL"
          value={`$${vaultStats.pnl24h.toLocaleString()}`}
          icon={Activity}
          trend="up"
          trendValue="+0.52%"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">NAV Over Time</h3>
          <LineChart
            data={navHistory}
            dataKey="nav"
            xAxisKey="date"
            color="hsl(270 91% 65%)"
          />
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Allocation by Market Type</h3>
          <BarChart
            data={marketAllocations}
            dataKey="allocation"
            xAxisKey="market"
            color="hsl(220 91% 60%)"
          />
        </Card>
      </div>

      {/* Charts Row 2 */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">PnL Distribution</h3>
        <BarChart
          data={pnlHistogram}
          dataKey="count"
          xAxisKey="range"
          color="hsl(180 91% 60%)"
          height={250}
        />
      </Card>

      {/* Current Positions */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Current Open Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Market</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Side</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Size</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Entry</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Current</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">PnL</th>
              </tr>
            </thead>
            <tbody>
              {currentPositions.map((position, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium">{position.market}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      position.side === 'LONG' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {position.side}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{position.size}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{position.entryPrice}</td>
                  <td className="py-3 px-4 text-right">{position.currentPrice}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-green-500 font-medium">{position.pnl}</div>
                    <div className="text-xs text-muted-foreground">{position.pnlValue}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
