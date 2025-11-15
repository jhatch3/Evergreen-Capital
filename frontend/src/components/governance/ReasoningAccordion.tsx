import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { ExternalLink } from 'lucide-react';

interface AgentReasoning {
  agent: string;
  vote: 'YES' | 'NO';
  rationale: string;
}

interface ReasoningAccordionProps {
  reasoning: AgentReasoning[];
  dataSources: string[];
}

export const ReasoningAccordion = ({ reasoning, dataSources }: ReasoningAccordionProps) => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="agent-reasoning" className="border border-border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Agent Reasoning & Votes</span>
              <Badge variant="outline">{reasoning.length} agents</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4">
              {reasoning.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.agent}</span>
                    <Badge
                      className={
                        item.vote === 'YES'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }
                    >
                      {item.vote}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-sources" className="border border-border rounded-lg px-4 mt-2">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Data Sources</span>
              <Badge variant="outline">{dataSources.length} sources</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-4">
              {dataSources.map((source, index) => (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground">
                    {source}
                  </span>
                </a>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
