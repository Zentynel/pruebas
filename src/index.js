const http = require('http');
const url = require('url');

// Mock accounts data (hardcoded)
const accounts = [
  { id: 'acc-1', iban: 'ES9121000418450200051332', name: 'Cuenta A' },
  { id: 'acc-2', iban: 'DE89370400440532013000', name: 'Cuenta B' }
];

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname || '/';
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/');

  res.setHeader('Content-Type', 'application/json');

  // GET /accounts -> list all accounts
  if (req.method === 'GET' && pathname === '/accounts') {
    res.writeHead(200);
    res.end(JSON.stringify(accounts));
    return;
  }

  // GET /accounts/:id -> return single account
  if (req.method === 'GET' && parts[0] === 'accounts' && parts[1]) {
    const account = accounts.find(a => a.id === parts[1]);
    if (account) {
      res.writeHead(200);
      res.end(JSON.stringify(account));
      return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Account not found' }));
    return;
  }

  // Not found
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mock accounts API listening on http://localhost:${PORT}`);
});
