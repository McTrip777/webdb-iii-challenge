const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true, 
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/cohort', async (req, res) => {
  try {
    const cohort = await db('cohort'); 
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`API running on http://localhost:${port}`)
);
