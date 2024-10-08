import http from 'http';
import express from 'express';
import config from './config/config';
import router from './routes/routes';
import connectToDb from './utils/connect-to-db';

const app = express();

app.use(router);

connectToDb();

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, (err?: Error) => {
  if (err) {
    console.error(`Failed to start server on port ${config.server.port}`, err);
    process.exit(1);
  }
  console.log(`listening on port: ${config.server.port}`);
});
