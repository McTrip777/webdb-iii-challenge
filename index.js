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

server.get('/api/cohort/:id', async (req, res) => {
    try {
      const cohort = await db('cohort')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  server.get('/api/cohort/:id/student', async (req, res) => {
      const id = req.params.id;
    try {
        const student = await db
        .select('*')
        .from('cohort')
        .where({'cohort.id': id})
        .join('student', {'cohort.id': 'student.cohortId'})
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json(error);
    }
    // try {
    //   const cohort = await db('cohort')
    //     .where({ id: req.params.id })
    //   const student = await db('student')
    //     if(cohort.id === student.cohortId){
    //         res.status(200).json(student);
    //     }else{
    //         res.status(404).json({message: 'No students in this Cohort'})
    //     }
    // } catch (error) {
    //   res.status(500).json(error);
    // }
  });
  
  server.post('/api/cohort', async (req, res) => {
    try {
      const [id] = await db('cohort').insert(req.body);
      const cohort = await db('cohort')
        .where({ id })
        .first();
      res.status(201).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  server.put('/api/cohort/:id', async (req, res) => {
    try {
      const count = await db('cohort')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const cohort = await db('cohort')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(cohort);
      } else {
        res.status(404).json(error);
      }
    } catch (error){}
  });
  
  server.delete('/api/cohort/:id', async (req, res) => {
    try {
      const count = await db('cohort')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json(error);
      }
    } catch (error) {}
  });
  
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`API running on http://localhost:${port}`)
);
