"""
Pydantic schemas for report-related endpoints
"""
from pydantic import BaseModel
from typing import List


class DailyReport(BaseModel):
    date: str
    pnl: str
    pnlPercent: str
    trades: int
    winRate: float
    keyTrades: List[str]
    agentNotes: str
    ipfsReport: str


DailyReportsResponse = List[DailyReport]


class DailyReportResponse(DailyReport):
    pass


class ReportSummaryResponse(BaseModel):
    totalPnl: float
    averageWinRate: float
    totalTrades: int
    profitableDays: int
    totalDays: int

