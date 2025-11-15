# Backend Structure Guide

## ✅ Best Practice: Organized Router Structure

**NO** - Don't put all async functions in `main.py`!

**YES** - Organize endpoints into separate router files by domain.

## 📁 Current Structure

```
backend/
├── app/
│   ├── main.py          # App setup & router registration ONLY
│   └── config.py        # Configuration
├── routers/             # All endpoint logic goes here
│   ├── __init__.py
│   ├── vault.py         # Vault endpoints
│   ├── users.py         # User endpoints
│   ├── positions.py     # Position endpoints
│   ├── governance.py    # Governance endpoints
│   ├── agents.py        # Agent endpoints
│   └── reports.py       # Report endpoints
├── schemas/             # Pydantic models for request/response
│   ├── vault.py
│   ├── users.py
│   ├── positions.py
│   ├── governance.py
│   ├── agents.py
│   └── reports.py
├── models/              # Database models (SQLAlchemy)
│   └── users.py
└── db/                  # Database configuration
    ├── database.py
    └── base.py
```

## 🎯 What Goes Where

### `app/main.py` - App Setup Only
- FastAPI app creation
- CORS middleware
- Router registration
- Health check endpoints

**DO:**
```python
from fastapi import FastAPI
from routers import vault, users

app = FastAPI()
app.include_router(vault.router, prefix="/api/vault")
```

**DON'T:**
```python
# Don't put endpoint logic here!
@app.get("/api/vault/stats")
async def get_vault_stats():
    # This should be in routers/vault.py
    pass
```

### `routers/*.py` - All Endpoint Logic
Each router file contains:
- Route definitions (`@router.get`, `@router.post`, etc.)
- Business logic
- Database queries
- Error handling

**Example: `routers/vault.py`**
```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
async def get_vault_stats():
    # Your logic here
    return {"totalValueLocked": 1000000}
```

### `schemas/*.py` - Request/Response Models
Pydantic models for:
- Request validation
- Response serialization
- Type safety

**Example: `schemas/vault.py`**
```python
from pydantic import BaseModel

class VaultStatsResponse(BaseModel):
    totalValueLocked: float
    numberOfDepositors: int
```

## 🔄 How It Works

1. **Router files** define endpoints with `@router.get()` decorators
2. **main.py** imports routers and registers them with `app.include_router()`
3. **Prefixes** are added in main.py (e.g., `/api/vault`)
4. **Final URL** = prefix + router path
   - Example: `/api/vault` + `/stats` = `/api/vault/stats`

## 📝 Router Organization

### `routers/vault.py` (6 endpoints)
- `GET /api/vault/stats`
- `GET /api/vault/nav/history`
- `GET /api/vault/tvl/history`
- `GET /api/vault/allocations`
- `GET /api/vault/pnl/distribution`
- `POST /api/vault/deposit`

### `routers/users.py` (4 endpoints)
- `GET /api/user/profile`
- `GET /api/user/nav/history`
- `GET /api/user/commentary`
- `GET /api/user/deposits`

### `routers/positions.py` (1 endpoint)
- `GET /api/positions/current`

### `routers/governance.py` (4 endpoints)
- `GET /api/governance/proposals`
- `GET /api/governance/proposals/{id}`
- `GET /api/governance/proposals/{id}/reasoning`
- `POST /api/governance/proposals/{id}/vote`

### `routers/agents.py` (3 endpoints)
- `GET /api/agents`
- `GET /api/agents/debate/{proposal_id}`
- `GET /api/agents/debate/live`

### `routers/reports.py` (3 endpoints)
- `GET /api/reports/daily`
- `GET /api/reports/daily/{date}`
- `GET /api/reports/summary`

## 🚀 Running the Backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

The app will automatically:
1. Load `main.py`
2. Import all routers
3. Register all routes
4. Make all endpoints available

## ✅ Benefits of This Structure

1. **Organization** - Easy to find endpoints by domain
2. **Maintainability** - Each file has a single responsibility
3. **Scalability** - Easy to add new routers
4. **Team Collaboration** - Multiple developers can work on different routers
5. **Testing** - Easy to test routers independently

## 🔧 Next Steps

1. Replace `TODO` comments in routers with real database queries
2. Add database models in `models/` directory
3. Add authentication middleware
4. Add error handling
5. Add logging
6. Add tests for each router

