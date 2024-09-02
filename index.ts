import express from 'express';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import artistsRouter from './routers/artists';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);