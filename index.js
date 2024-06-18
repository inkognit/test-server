import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path';
import routes from './src/routes/index.js';
import mongoose from 'mongoose'


const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

app.options('*', cors());
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.all('', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  next();
});
app.use(cookieParser());

app.use(express.json({ limit: '50Mb' }));
app.use(express.urlencoded({ extended: false, limit: '50Mb' }));

const PORT = process.env.REACT_APP_SERVER_PORT || 3001;
mongoose.connect(process.env.MONGO_URI, {
  user: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  pass: process.env.DB_USER_PASS,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB'));
db.once('open', () => {
  console.log('Подключено к базе данных MongoDB');
});
app.use('/', routes);

app.listen(PORT, () => {
  console.log('We are live on ' + PORT);
});
