"""
Pydantic schemas for position-related endpoints
"""
from pydantic import BaseModel
from typing import List, Literal


class Position(BaseModel):
    market: str
    side: Literal["LONG", "SHORT"]
    size: str
    entryPrice: str
    currentPrice: str
    pnl: str
    pnlValue: str


PositionsResponse = List[Position]

