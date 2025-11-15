import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp } from 'lucide-react';

interface AgentCardProps {
  name: string;
  role: string;
  avatar: string;
  description: string;
  specialty: string;
  winRate: number;
}

export const AgentCard = ({ 
  name, 
  role, 
  avatar, 
  description, 
  specialty, 
  winRate 
}: AgentCardProps) => {
  return (
    <Card className="glass-card p-6 hover-glow-secondary transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-solana-glow flex items-center justify-center text-3xl">
          {avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Specialty</div>
          <Badge variant="outline">{specialty}</Badge>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
          <div className="flex items-center gap-1 font-semibold text-green-500">
            <TrendingUp className="w-4 h-4" />
            {winRate}%
          </div>
        </div>
      </div>
    </Card>
  );
};
