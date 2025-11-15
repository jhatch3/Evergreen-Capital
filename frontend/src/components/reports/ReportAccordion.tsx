import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';

interface DailyReport {
  date: string;
  pnl: string;
  pnlPercent: string;
  trades: number;
  winRate: number;
  keyTrades: string[];
  agentNotes: string;
  ipfsReport: string;
}

interface ReportAccordionProps {
  reports: DailyReport[];
}

export const ReportAccordion = ({ reports }: ReportAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {reports.map((report, index) => {
        const isPositive = report.pnl.startsWith('+');
        return (
          <AccordionItem
            key={report.date}
            value={`report-${index}`}
            className="border border-border rounded-lg px-4 glass-card"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="font-semibold">{report.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.trades} trades • {report.winRate}% win rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <div className="text-right">
                    <div className={`font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {report.pnl}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {report.pnlPercent}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Trades</h4>
                  <div className="space-y-2">
                    {report.keyTrades.map((trade, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-muted/50 border border-border text-sm"
                      >
                        {trade}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Agent Notes</h4>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {report.agentNotes}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Full Report (IPFS)</h4>
                  <a
                    href={report.ipfsReport}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary transition-colors group w-fit"
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground">
                      {report.ipfsReport}
                    </span>
                  </a>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
