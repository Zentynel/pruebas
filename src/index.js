import express from 'express';
import { accounts } from './data/accounts.js';
import { accountSchema, accountsListSchema } from './schemas/account.js';

const app = express();
app.use(express.json());

// MCP Context Type handlers
const contextHandlers = {
  accounts: {
    description: 'Banking accounts information',
    schema: accountsListSchema,
    resolve: async () => accounts
  },
  account: {
    description: 'Single bank account information',
    schema: accountSchema,
    resolve: async (params) => {
      const account = accounts.find(a => a.id === params?.id);
      if (!account) {
        throw new Error('Account not found');
      }
      return account;
    }
  }
};

// MCP endpoint
app.post('/mcp', async (req, res) => {
  const { contextType, parameters } = req.body;
  
  // Validate request
  if (!contextType || !contextHandlers[contextType]) {
    return res.status(400).json({
      error: 'Invalid context type',
      validTypes: Object.keys(contextHandlers)
    });
  }

  const handler = contextHandlers[contextType];

  try {
    const value = await handler.resolve(parameters);
    res.json({
      schema: handler.schema,
      value,
      metadata: {
        description: handler.description
      }
    });
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
});

// Keep REST endpoints for backwards compatibility
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

app.get('/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.id === req.params.id);
  if (!account) {
    res.status(404).json({ error: 'Account not found' });
    return;
  }
  res.json(account);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP Server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- REST API: /accounts and /accounts/:id');
  console.log('- MCP endpoint: POST /mcp');
  console.log('Available context types:', Object.keys(contextHandlers));
});
