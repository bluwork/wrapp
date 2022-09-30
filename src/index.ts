import 'dotenv/config';
import fs from 'fs';
import app from './app';

const resolveReportsDirPath = () => {
  try {
    const dirPath = process.env.REPORTS_FILE_DIRECTORY || './data';
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  } catch (error) {
    console.error(error);
  }
};

const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

const start = () => {
  resolveReportsDirPath();
  startServer();
};

start();
