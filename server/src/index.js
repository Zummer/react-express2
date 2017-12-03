import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
// import users from './routes/users';
import auth from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(bodyParser.json());
// app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.NODE_SERVER_PORT, () => console.log(`Running on localhost: ${process.env.NODE_SERVER_PORT}`));

