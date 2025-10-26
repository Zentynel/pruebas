# pruebas

This repository contains a tiny Node.js mock API that exposes two endpoints:

- GET /accounts -> returns a list of two mock accounts (each with an internal `id` and `iban`).
- GET /accounts/{account_id} -> returns a single account by its internal `id`.

How to run

1. Make sure you have Node.js (v12+) installed.
2. From the repository root run:

```powershell
node src/index.js
```

The API will listen on port 3000 by default.

Example requests

List accounts:

```powershell
curl http://localhost:3000/accounts
```

Get a single account (use one of the ids: `acc-1` or `acc-2`):

```powershell
curl http://localhost:3000/accounts/acc-1
```
