"""
Governance-related endpoints
Handles AI proposals, voting, and agent reasoning
"""
from fastapi import APIRouter, Path, Query, HTTPException
from typing import Optional
from schemas.governance import (
    ProposalsResponse,
    ProposalResponse,
    ProposalReasoningResponse,
    VoteRequest,
    VoteResponse
)

router = APIRouter()


@router.get("/proposals", response_model=ProposalsResponse)
async def get_proposals(
    status: Optional[str] = Query(None, description="Filter by status"),
    limit: int = Query(50, ge=1, le=100)
):
    """
    Get all governance proposals.
    """
    # TODO: Replace with real database query
    # Example: SELECT * FROM proposals WHERE status = status LIMIT limit
    
    proposals = [
        {
            "id": "prop-001",
            "market": "SOL-PERP",
            "direction": "LONG",
            "positionSize": "$150,000",
            "riskScore": 6.2,
            "confidence": 82,
            "status": "APPROVED",
            "summary": "Strong bullish momentum detected on SOL...",
            "timestamp": "2024-02-19T14:32:00Z",
            "dataSources": ["https://snowflake.mock/sol-price-data"]
        }
    ]
    
    if status:
        proposals = [p for p in proposals if p["status"] == status.upper()]
    
    return proposals[:limit]


@router.get("/proposals/{proposal_id}", response_model=ProposalResponse)
async def get_proposal(proposal_id: str = Path(..., description="Proposal ID")):
    """
    Get details for a single proposal.
    """
    # TODO: Replace with real database query
    # Example: SELECT * FROM proposals WHERE id = proposal_id
    
    return {
        "id": proposal_id,
        "market": "SOL-PERP",
        "direction": "LONG",
        "positionSize": "$150,000",
        "riskScore": 6.2,
        "confidence": 82,
        "status": "APPROVED",
        "summary": "Strong bullish momentum detected on SOL...",
        "timestamp": "2024-02-19T14:32:00Z",
        "dataSources": ["https://snowflake.mock/sol-price-data"]
    }


@router.get("/proposals/{proposal_id}/reasoning", response_model=ProposalReasoningResponse)
async def get_proposal_reasoning(proposal_id: str = Path(..., description="Proposal ID")):
    """
    Get agent reasoning for a proposal.
    """
    # TODO: Replace with real database query
    # Example: SELECT * FROM proposal_reasoning WHERE proposal_id = proposal_id
    
    return [
        {
            "agent": "Quant Analyst",
            "vote": "YES",
            "rationale": "Bollinger bands squeezing with RSI at 68..."
        },
        {
            "agent": "Risk Manager",
            "vote": "YES",
            "rationale": "Portfolio heat at 42%, sufficient room..."
        },
    ]


@router.post("/proposals/{proposal_id}/vote", response_model=VoteResponse)
async def vote_on_proposal(
    proposal_id: str = Path(..., description="Proposal ID"),
    vote_data: VoteRequest = ...
):
    """
    Submit a vote on a proposal.
    """
    # TODO: Implement voting logic
    # 1. Verify wallet signature
    # 2. Check if user has already voted
    # 3. Record vote in database
    # 4. Update proposal vote count
    
    if vote_data.vote not in ["YES", "NO"]:
        raise HTTPException(status_code=400, detail="Vote must be 'YES' or 'NO'")
    
    return {
        "success": True,
        "message": "Vote recorded",
        "voteId": f"vote-{proposal_id}-{vote_data.walletAddress}"
    }

