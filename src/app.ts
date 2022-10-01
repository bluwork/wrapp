import express from 'express';
import helmet from 'helmet';
import routes from './routes';
import errorHandler from './middleware/error/error-handler';
import rateLimiter from './middleware/requests-limiting/rate-limiter';

const app = express();

app.use(express.json());

app.use(helmet());

app.use(rateLimiter);

app.use('/', routes);

app.use(errorHandler);

export default app;
