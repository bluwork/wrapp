import express from 'express';
import routes from './routes';
import errorHandler from './middleware/error/error-handler';

const app = express();

app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

export default app;
