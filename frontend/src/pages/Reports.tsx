import { ReportAccordion } from '@/components/reports/ReportAccordion';
import { MetricCard } from '@/components/MetricCard';
import { Card } from '@/components/ui/card';
import { TrendingUp, Target, Award, Activity } from 'lucide-react';
import { dailyReports } from '@/lib/mockData';

const Reports = () => {
  // Calculate summary stats from reports
  const totalPnl = dailyReports.reduce((sum, report) => {
    const pnlValue = parseFloat(report.pnl.replace(/[+,]/g, ''));
    return sum + pnlValue;
  }, 0);

  const avgWinRate =
    dailyReports.reduce((sum, report) => sum + report.winRate, 0) / dailyReports.length;

  const totalTrades = dailyReports.reduce((sum, report) => sum + report.trades, 0);

  const profitableDays = dailyReports.filter((report) => report.pnl.startsWith('+')).length;

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-solana bg-clip-text text-transparent">
          Performance Reports
        </h1>
        <p className="text-muted-foreground text-lg">
          Daily trading reports with IPFS archives
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total PnL (Period)"
          value={`$${totalPnl.toLocaleString()}`}
          icon={TrendingUp}
          trend="up"
          trendValue={`${dailyReports.length} days`}
        />
        <MetricCard
          title="Average Win Rate"
          value={`${avgWinRate.toFixed(1)}%`}
          icon={Target}
          subtitle="Across all trades"
        />
        <MetricCard
          title="Profitable Days"
          value={`${profitableDays}/${dailyReports.length}`}
          icon={Award}
          subtitle={`${((profitableDays / dailyReports.length) * 100).toFixed(0)}% success rate`}
        />
        <MetricCard
          title="Total Trades"
          value={totalTrades.toString()}
          icon={Activity}
          subtitle="All executions"
        />
      </div>

      {/* Daily Reports */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Performance Reports</h3>
        <ReportAccordion reports={dailyReports} />
      </Card>

      {/* Report Archive Info */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Report Archive Information</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            All daily performance reports are archived on IPFS (InterPlanetary File System) for permanent, decentralized storage and verification.
          </p>
          <p>
            Each report includes comprehensive trade logs, agent decision transcripts, risk metrics, and performance analytics.
          </p>
          <p>
            Reports are immutable once published, ensuring complete transparency and auditability of all trading activity.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
