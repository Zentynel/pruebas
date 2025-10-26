# Banking Accounts MCP Server

This repository implements a simplified version of the Model Context Protocol (MCP) server that provides structured banking account information for LLMs. The server exposes both REST API endpoints and an MCP-compatible endpoint for retrieving account data.

## Setup

1. Make sure you have Node.js installed
2. Install dependencies:
```powershell
npm install
```
3. Start the server:
```powershell
npm start
```

The server will listen on port 3000 by default.

## Available Endpoints

### REST API (for backward compatibility)
- `GET /accounts` - List all accounts
- `GET /accounts/{id}` - Get a single account by ID

### MCP Endpoint
The MCP endpoint is available at `POST /mcp` and supports the following context types:

1. `accounts` - Returns list of all accounts
   - Schema: Array of account objects
   - No parameters required
   - Returns: Full schema and account list

2. `account` - Returns a single account by ID
   - Schema: Single account object
   - Required parameters:
     - `id`: The account identifier (e.g., 'acc-1')
   - Returns: Full schema and account data

## MCP Integration Example

Example retrieving all accounts:

```powershell
# PowerShell
$body = @{
    contextType = 'accounts'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/mcp -Method Post -Body $body -ContentType 'application/json'
```

Example retrieving a single account:

```powershell
# PowerShell
$body = @{
    contextType = 'account'
    parameters = @{
        id = 'acc-1'
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/mcp -Method Post -Body $body -ContentType 'application/json'
```

## Response Format

The MCP endpoint always returns responses in this format:

```json
{
  "schema": {
    // JSON Schema for the returned data
  },
  "value": {
    // The actual data matching the schema
  },
  "metadata": {
    "description": "Human readable description of the context type"
  }
}
```

## Available Data

The server includes two mock bank accounts:
1. Account with ID `acc-1`: Spanish IBAN
2. Account with ID `acc-2`: German IBAN

## Error Handling

The MCP endpoint returns proper HTTP status codes:
- 400 Bad Request: Invalid context type
- 404 Not Found: Account not found
- 200 OK: Successful response with schema and data
