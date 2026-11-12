import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/error.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    // Allows your web app AND a future Chrome extension (chrome-extension://<id>)
    origin: (origin, cb) => {
      if (!origin || origin === env.clientUrl || origin.startsWith('chrome-extension://')) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json({ limit: '1mb' }));
if (env.nodeEnv !== 'test') app.use(morgan('dev'));

app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
