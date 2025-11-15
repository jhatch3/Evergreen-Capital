"""
Agent-related endpoints
Handles AI agent personas and debate transcripts
"""
from fastapi import APIRouter, Path
from schemas.agents import (
    AgentsResponse,
    DebateTranscriptResponse
)

router = APIRouter()


@router.get("", response_model=AgentsResponse)
async def get_agents():
    """
    Get all agent personas.
    """
    # TODO: Replace with real database query or static config
    
    return [
        {
            "id": "quant-analyst",
            "name": "Quant Analyst",
            "role": "Technical Analysis & Indicators",
            "avatar": "📊",
            "description": "Analyzes price action, volume profiles, and technical indicators...",
            "specialty": "Technical Analysis",
            "winRate": 76.3
        },
        {
            "id": "risk-manager",
            "name": "Risk Manager",
            "role": "Portfolio Risk & Exposure",
            "avatar": "🛡️",
            "description": "Monitors portfolio heat, correlation risk, and maximum drawdown...",
            "specialty": "Risk Management",
            "winRate": 84.1
        },
        {
            "id": "market-maker",
            "name": "Market Maker",
            "role": "Liquidity & Order Flow",
            "avatar": "💧",
            "description": "Tracks order book depth, spread dynamics, and liquidity conditions...",
            "specialty": "Market Microstructure",
            "winRate": 71.8
        },
        {
            "id": "news-analyst",
            "name": "News Analyst",
            "role": "Sentiment & Events",
            "avatar": "📰",
            "description": "Monitors social sentiment, news catalysts, and upcoming events...",
            "specialty": "Sentiment Analysis",
            "winRate": 68.4
        },
        {
            "id": "arbitrage-analyst",
            "name": "Arbitrage Analyst",
            "role": "Cross-Market Opportunities",
            "avatar": "⚡",
            "description": "Identifies pricing inefficiencies across venues and derivatives...",
            "specialty": "Statistical Arbitrage",
            "winRate": 79.2
        },
    ]


@router.get("/debate/{proposal_id}", response_model=DebateTranscriptResponse)
async def get_debate_transcript(proposal_id: str = Path(..., description="Proposal ID")):
    """
    Get debate transcript for a specific proposal.
    """
    # TODO: Replace with real database query
    # Example: SELECT * FROM debate_messages WHERE proposal_id = proposal_id ORDER BY timestamp
    
    return {
        "proposalId": proposal_id,
        "messages": [
            {
                "agent": "Quant Analyst",
                "message": "SOL showing strong technical setup...",
                "timestamp": "14:28:33",
                "vote": "YES"
            },
            {
                "agent": "Risk Manager",
                "message": "Portfolio heat check: currently at 42%...",
                "timestamp": "14:29:01",
                "vote": "YES"
            },
        ]
    }


@router.get("/debate/live", response_model=DebateTranscriptResponse)
async def get_live_debate():
    """
    Get the current live debate transcript.
    """
    # TODO: Replace with real database query
    # Example: SELECT * FROM debate_messages WHERE proposal_id = (SELECT id FROM proposals WHERE status = 'PENDING' ORDER BY timestamp DESC LIMIT 1)
    
    return {
        "proposalId": "prop-002",
        "messages": [
            {
                "agent": "Quant Analyst",
                "message": "Current analysis...",
                "timestamp": "14:28:33",
                "vote": "YES"
            },
        ]
    }

