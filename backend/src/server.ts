import express from 'express';
import cors from 'cors';
import { join } from 'node:path';

import handleAPIrequest from './handler.js';

const app = express();
const port = process.env['PORT'] || 8000;

const root = process.cwd();
const staticDir = join(root, 'build');
const indexFile = join(staticDir, 'index.html');

app.use(express.static(staticDir));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.post('/api/', handleAPIrequest);
app.get('*', (_, res) => res.sendFile(indexFile));

app.listen(port, () => {
  console.log(`Started server at:\thttp://localhost:${port}`);
});
