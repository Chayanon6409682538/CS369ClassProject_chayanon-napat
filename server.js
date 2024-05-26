import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import sql from "mssql";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const port = 3000
const config = {
    server: "database-1.c90qegkiwoha.us-east-1.rds.amazonaws.com",
    database: "cs369",
    user: "admin",
    password: "12345678",
    encrypt: false,
    trustServerCertificate: false,
  };

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/product', (req, res) => {
    sql.connect(config)
      .then(pool => {
        return pool.request().query('SELECT * FROM product');
      })
      .then(result => {
        res.json(result.recordset);
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

