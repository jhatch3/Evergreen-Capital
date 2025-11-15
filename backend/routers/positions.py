"""
Position-related endpoints
Handles current open trading positions
"""
from fastapi import APIRouter
from schemas.positions import PositionsResponse

router = APIRouter()


@router.get("/current", response_model=PositionsResponse)
async def get_current_positions():
    """
    Get all currently open trading positions.
    """
    # TODO: Replace with real database query
    # Example: SELECT * FROM positions WHERE status = 'open'
    
    return [
        {
            "market": "SOL-PERP",
            "side": "LONG",
            "size": "$142,340",
            "entryPrice": "$98.45",
            "currentPrice": "$102.34",
            "pnl": "+3.95%",
            "pnlValue": "+$5,622"
        },
        {
            "market": "JTO-PERP",
            "side": "SHORT",
            "size": "$87,230",
            "entryPrice": "$3.12",
            "currentPrice": "$2.98",
            "pnl": "+4.49%",
            "pnlValue": "+$3,916"
        },
    ]

