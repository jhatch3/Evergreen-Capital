import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface ProposalCardProps {
  market: string;
  direction: 'LONG' | 'SHORT';
  positionSize: string;
  riskScore: number;
  confidence: number;
  status: 'PENDING' | 'APPROVED' | 'EXECUTED';
  summary: string;
  timestamp: string;
}

export const ProposalCard = ({
  market,
  direction,
  positionSize,
  riskScore,
  confidence,
  status,
  summary,
  timestamp,
}: ProposalCardProps) => {
  const statusColors = {
    PENDING: 'bg-yellow-500/20 text-yellow-500',
    APPROVED: 'bg-green-500/20 text-green-500',
    EXECUTED: 'bg-blue-500/20 text-blue-500',
  };

  const directionColors = {
    LONG: 'bg-green-500/20 text-green-500',
    SHORT: 'bg-red-500/20 text-red-500',
  };

  return (
    <Card className="glass-card p-6 hover-glow-secondary transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-solana-glow flex items-center justify-center">
            {direction === 'LONG' ? (
              <TrendingUp className="w-6 h-6 text-green-500" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-500" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold">{market}</h3>
            <div className="text-sm text-muted-foreground">
              {new Date(timestamp).toLocaleString()}
            </div>
          </div>
        </div>
        <Badge className={statusColors[status]}>{status}</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Direction</div>
          <Badge className={directionColors[direction]}>{direction}</Badge>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Position Size</div>
          <div className="font-semibold">{positionSize}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Risk Score</div>
          <div className="font-semibold flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            {riskScore.toFixed(1)}/10
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Confidence</div>
          <div className="font-semibold text-primary">{confidence}%</div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm leading-relaxed">{summary}</p>
      </div>
    </Card>
  );
};
