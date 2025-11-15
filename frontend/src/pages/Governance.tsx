import { ProposalCard } from '@/components/governance/ProposalCard';
import { ReasoningAccordion } from '@/components/governance/ReasoningAccordion';
import { Card } from '@/components/ui/card';
import { aiProposals } from '@/lib/mockData';

const Governance = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12 max-w-6xl">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-solana bg-clip-text text-transparent">
          AI Governance
        </h1>
        <p className="text-muted-foreground text-lg">
          Real-time AI agent proposals and decision-making
        </p>
      </div>

      <div className="space-y-8">
        {aiProposals.map((proposal) => (
          <div key={proposal.id} className="space-y-4">
            <ProposalCard
              market={proposal.market}
              direction={proposal.direction as 'LONG' | 'SHORT'}
              positionSize={proposal.positionSize}
              riskScore={proposal.riskScore}
              confidence={proposal.confidence}
              status={proposal.status as 'PENDING' | 'APPROVED' | 'EXECUTED'}
              summary={proposal.summary}
              timestamp={proposal.timestamp}
            />

            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Multi-Agent Analysis</h3>
              <ReasoningAccordion
                reasoning={proposal.reasoning}
                dataSources={proposal.dataSources}
              />
            </Card>
          </div>
        ))}
      </div>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">How AI Governance Works</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Our AI hedge fund uses a multi-agent consensus system where five specialized agents analyze market opportunities independently.
          </p>
          <p>
            Each agent votes YES or NO on proposed trades based on their domain expertise. A proposal requires majority approval (3/5) to be executed.
          </p>
          <p>
            All reasoning, data sources, and decision transcripts are transparently recorded on-chain and stored on IPFS for full auditability.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Governance;
