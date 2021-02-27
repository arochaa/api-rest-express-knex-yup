import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(logger('combined'));
app.use('/api', routes);
app.use(
  '/api/uploads',
  express.static(path.resolve(__dirname, '..', 'uploads')),
);

export default app;
