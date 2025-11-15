# Backend API Endpoints Reference

This document outlines all the API endpoints your FastAPI backend needs to implement to support the frontend.

## Base URL

All endpoints should be prefixed with `/api`

## Authentication

Most endpoints require wallet authentication. The frontend will send the wallet address as:
- Query parameter: `?wallet=<address>`
- Or in request body for POST requests
- Or as a header: `X-Wallet-Address: <address>`

For protected endpoints, you may also need to verify wallet signatures.

## Response Format

All endpoints should return JSON in this format:

**Success:**
```json
{
  "data": { ... }
}
```

**Error:**
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Endpoints

### 1. Vault Statistics

**GET** `/api/vault/stats`

Returns vault-wide statistics.

**Response:**
```json
{
  "totalValueLocked": 2847392.45,
  "numberOfDepositors": 1247,
  "strategyWinRate": 73.4,
  "pnl24h": 14293.67,
  "vaultSharePrice": 1.0847,
  "userDepositedAmount": 0,
  "userVaultShares": 0
}
```

**FastAPI Example:**
```python
@app.get("/api/vault/stats")
async def get_vault_stats(wallet: Optional[str] = None):
    stats = {
        "totalValueLocked": get_total_value_locked(),
        "numberOfDepositors": get_depositor_count(),
        "strategyWinRate": get_win_rate(),
        "pnl24h": get_24h_pnl(),
        "vaultSharePrice": get_share_price(),
    }
    
    if wallet:
        stats["userDepositedAmount"] = get_user_deposit(wallet)
        stats["userVaultShares"] = get_user_shares(wallet)
    
    return stats
```

---

### 2. NAV History

**GET** `/api/vault/nav/history`

Returns NAV (Net Asset Value) history over time.

**Query Parameters:**
- `days` (optional): Number of days to return (default: 30)

**Response:**
```json
[
  { "date": "Jan 1", "nav": 1.0000 },
  { "date": "Jan 8", "nav": 1.0124 },
  { "date": "Jan 15", "nav": 1.0287 }
]
```

---

### 3. TVL History

**GET** `/api/vault/tvl/history`

Returns Total Value Locked history over time.

**Query Parameters:**
- `days` (optional): Number of days to return (default: 30)

**Response:**
```json
[
  { "date": "Jan 1", "value": 1200000 },
  { "date": "Jan 8", "value": 1450000 },
  { "date": "Jan 15", "value": 1680000 }
]
```

---

### 4. Market Allocations

**GET** `/api/vault/allocations`

Returns current allocation breakdown by market type.

**Response:**
```json
[
  { "market": "Perps", "allocation": 42 },
  { "market": "Spot", "allocation": 28 },
  { "market": "Options", "allocation": 18 },
  { "market": "Liquid Staking", "allocation": 12 }
]
```

---

### 5. PnL Distribution

**GET** `/api/vault/pnl/distribution`

Returns PnL distribution histogram data.

**Response:**
```json
[
  { "range": "-5%", "count": 3 },
  { "range": "-2%", "count": 8 },
  { "range": "0%", "count": 15 },
  { "range": "+2%", "count": 28 },
  { "range": "+5%", "count": 34 }
]
```

---

### 6. Current Positions

**GET** `/api/positions/current`

Returns all currently open trading positions.

**Response:**
```json
[
  {
    "market": "SOL-PERP",
    "side": "LONG",
    "size": "$142,340",
    "entryPrice": "$98.45",
    "currentPrice": "$102.34",
    "pnl": "+3.95%",
    "pnlValue": "+$5,622"
  }
]
```

---

### 7. User Profile

**GET** `/api/user/profile`

Returns user-specific profile data.

**Query Parameters:**
- `wallet` (required): Wallet address

**Response:**
```json
{
  "totalDeposited": 25.5,
  "totalDepositedUSD": 2547,
  "depositDate": "Feb 1, 2024",
  "daysInVault": 18,
  "vaultSharePercent": 0.89,
  "vaultShares": 23.5234,
  "estimatedYieldPercent": 8.47,
  "estimatedYieldSOL": 2.16
}
```

---

### 8. User NAV History

**GET** `/api/user/nav/history`

Returns user's personal NAV history.

**Query Parameters:**
- `wallet` (required): Wallet address
- `days` (optional): Number of days

**Response:**
```json
[
  { "date": "Jan 1", "nav": 1.0000 },
  { "date": "Jan 8", "nav": 1.0124 }
]
```

---

### 9. User Commentary

**GET** `/api/user/commentary`

Returns AI agent commentary for the user.

**Query Parameters:**
- `wallet` (required): Wallet address

**Response:**
```json
[
  {
    "agent": "Risk Manager",
    "timestamp": "2h ago",
    "message": "Your position is well-diversified..."
  }
]
```

---

### 10. User Deposits

**GET** `/api/user/deposits`

Returns user's deposit history.

**Query Parameters:**
- `wallet` (required): Wallet address

**Response:**
```json
[
  {
    "id": "deposit-001",
    "amount": 25.5,
    "amountUSD": 2547,
    "timestamp": "2024-02-01T10:00:00Z",
    "transactionHash": "5j7s...",
    "status": "confirmed"
  }
]
```

---

### 11. Create Deposit

**POST** `/api/vault/deposit`

Creates a new deposit transaction.

**Request Body:**
```json
{
  "amount": 10.0,
  "walletAddress": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "signature": "base64_signature_string"
}
```

**Response:**
```json
{
  "transactionHash": "5j7s...",
  "status": "pending",
  "message": "Deposit transaction created"
}
```

---

### 12. Governance Proposals

**GET** `/api/governance/proposals`

Returns all governance proposals.

**Query Parameters:**
- `status` (optional): Filter by status (PENDING, APPROVED, REJECTED, EXECUTED)
- `limit` (optional): Number of results (default: 50)

**Response:**
```json
[
  {
    "id": "prop-001",
    "market": "SOL-PERP",
    "direction": "LONG",
    "positionSize": "$150,000",
    "riskScore": 6.2,
    "confidence": 82,
    "status": "APPROVED",
    "summary": "Strong bullish momentum...",
    "timestamp": "2024-02-19T14:32:00Z",
    "dataSources": ["https://snowflake.mock/sol-price-data"]
  }
]
```

---

### 13. Single Proposal

**GET** `/api/governance/proposals/{proposal_id}`

Returns details for a single proposal.

**Response:**
```json
{
  "id": "prop-001",
  "market": "SOL-PERP",
  "direction": "LONG",
  "positionSize": "$150,000",
  "riskScore": 6.2,
  "confidence": 82,
  "status": "APPROVED",
  "summary": "Strong bullish momentum...",
  "timestamp": "2024-02-19T14:32:00Z",
  "dataSources": ["https://snowflake.mock/sol-price-data"]
}
```

---

### 14. Proposal Reasoning

**GET** `/api/governance/proposals/{proposal_id}/reasoning`

Returns agent reasoning for a proposal.

**Response:**
```json
[
  {
    "agent": "Quant Analyst",
    "vote": "YES",
    "rationale": "Bollinger bands squeezing..."
  },
  {
    "agent": "Risk Manager",
    "vote": "YES",
    "rationale": "Portfolio heat at 42%..."
  }
]
```

---

### 15. Vote on Proposal

**POST** `/api/governance/proposals/{proposal_id}/vote`

Submits a vote on a proposal.

**Request Body:**
```json
{
  "vote": "YES",
  "walletAddress": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "signature": "base64_signature_string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Vote recorded",
  "voteId": "vote-001"
}
```

---

### 16. Agents List

**GET** `/api/agents`

Returns all agent personas.

**Response:**
```json
[
  {
    "id": "quant-analyst",
    "name": "Quant Analyst",
    "role": "Technical Analysis & Indicators",
    "avatar": "📊",
    "description": "Analyzes price action...",
    "specialty": "Technical Analysis",
    "winRate": 76.3
  }
]
```

---

### 17. Debate Transcript

**GET** `/api/agents/debate/{proposal_id}`

Returns debate transcript for a specific proposal.

**Response:**
```json
{
  "proposalId": "prop-001",
  "messages": [
    {
      "agent": "Quant Analyst",
      "message": "SOL showing strong technical setup...",
      "timestamp": "14:28:33",
      "vote": "YES"
    }
  ]
}
```

---

### 18. Live Debate

**GET** `/api/agents/debate/live`

Returns the current live debate transcript.

**Response:**
```json
{
  "proposalId": "prop-002",
  "messages": [
    {
      "agent": "Quant Analyst",
      "message": "Current analysis...",
      "timestamp": "14:28:33",
      "vote": "YES"
    }
  ]
}
```

---

### 19. Daily Reports

**GET** `/api/reports/daily`

Returns list of daily performance reports.

**Query Parameters:**
- `limit` (optional): Number of reports (default: 30)
- `offset` (optional): Pagination offset

**Response:**
```json
[
  {
    "date": "2024-02-19",
    "pnl": "+14,293.67",
    "pnlPercent": "+0.52%",
    "trades": 7,
    "winRate": 71.4,
    "keyTrades": ["Opened SOL-PERP LONG..."],
    "agentNotes": "Strong risk-adjusted returns...",
    "ipfsReport": "ipfs://QmX7Ry4KjQz8hN3vM2wP9sA1bT5cU6dE8fG9hI0jK1lM2n"
  }
]
```

---

### 20. Single Daily Report

**GET** `/api/reports/daily/{date}`

Returns a specific daily report.

**Response:**
```json
{
  "date": "2024-02-19",
  "pnl": "+14,293.67",
  "pnlPercent": "+0.52%",
  "trades": 7,
  "winRate": 71.4,
  "keyTrades": ["Opened SOL-PERP LONG..."],
  "agentNotes": "Strong risk-adjusted returns...",
  "ipfsReport": "ipfs://QmX7Ry4KjQz8hN3vM2wP9sA1bT5cU6dE8fG9hI0jK1lM2n"
}
```

---

### 21. Report Summary

**GET** `/api/reports/summary`

Returns summary statistics across all reports.

**Response:**
```json
{
  "totalPnl": 53450.08,
  "averageWinRate": 72.1,
  "totalTrades": 33,
  "profitableDays": 4,
  "totalDays": 5
}
```

---

## CORS Configuration

Make sure your FastAPI app has CORS enabled:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Error Handling

All endpoints should handle errors gracefully:

```python
from fastapi import HTTPException

@app.get("/api/vault/stats")
async def get_vault_stats():
    try:
        # Your logic here
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

