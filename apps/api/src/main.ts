import * as express from 'express';
import { Message } from '@office-hours/api-interfaces';

const app = express();
app.use(express.json());
const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.json(greeting);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
