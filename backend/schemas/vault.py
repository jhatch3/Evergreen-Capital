"""
Pydantic schemas for vault-related endpoints
"""
from pydantic import BaseModel
from typing import List, Optional


class VaultStatsResponse(BaseModel):
    totalValueLocked: float
    numberOfDepositors: int
    strategyWinRate: float
    pnl24h: float
    vaultSharePrice: float
    userDepositedAmount: Optional[float] = None
    userVaultShares: Optional[float] = None


class NavHistoryPoint(BaseModel):
    date: str
    nav: float


NavHistoryResponse = List[NavHistoryPoint]


class TvlHistoryPoint(BaseModel):
    date: str
    value: float


TvlHistoryResponse = List[TvlHistoryPoint]


class MarketAllocation(BaseModel):
    market: str
    allocation: int


MarketAllocationResponse = List[MarketAllocation]


class PnlHistogramPoint(BaseModel):
    range: str
    count: int


PnlDistributionResponse = List[PnlHistogramPoint]


class DepositRequest(BaseModel):
    amount: float
    walletAddress: str
    signature: Optional[str] = None


class DepositResponse(BaseModel):
    transactionHash: str
    status: str
    message: str

