import 'dotenv/config';
import app from './app';

const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

startServer();
