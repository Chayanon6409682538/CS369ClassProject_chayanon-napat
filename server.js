import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import fs from 'fs';
import sql from "mssql";
//import axios from 'axios'; // import axios ที่นี่
import multer from 'multer';  // เปลี่ยนจาก require เป็น import


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // กำหนดโฟลเดอร์สำหรับเก็บรูปภาพ
  },
  filename: function (req, file, cb) {
    const type = file.originalname
    const fourlastchar = (type.toString()).slice(type.length-4,type.length)
    const lastnameFile = fourlastchar  === ".jpg" || fourlastchar  === ".png" ? fourlastchar : fourlastchar === "jpeg" ? "." + fourlastchar : "";
    cb(null, Date.now() + '_' +(Math.floor(Math.random() * 90000) + 10000).toString() + lastnameFile);
  },
});
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
const port = 3000
const config = {
    server: "database-1.c90qegkiwoha.us-east-1.rds.amazonaws.com",
    database: "cs369",
    user: "admin",
    password: "12345678",
    encrypt: false,
    trustServerCertificate: false,
  };

  
  app.post("/upload", upload.single("file"), function (req, res) {
    console.log("hello");
    console.log(req.file);
  const file = req.file;
  res.status(200).json(file.filename);
});

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

  app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    sql.connect(config)
      .then(pool => {
        return pool.request()
                   .input('productId', sql.Int, id)
                   .query('SELECT * FROM product WHERE id = @productId');
      })
      .then(result => {
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
});

app.post('/products', async (req, res) => {
  console.log("hello");
  const newProduct = { // สร้าง Object newProduct
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    size: req.body.size
  };

  try {
  const pool = await sql.connect(config);
  const result = await pool
    .request()
    .input('name', sql.NVarChar, newProduct.name)
    .input('image', sql.NVarChar, newProduct.image)
    .input('price', sql.Decimal(10, 2), newProduct.price)
    .input('description', sql.NVarChar, newProduct.description)
    .input('size', sql.NVarChar, newProduct.size)
    .query('INSERT INTO product (productName, productPrice, productDescription, PathToPicture, size) VALUES (@name, @price, @description,@image,@size)');
await pool.close();
res.send('Form data received and inserted into the database successfully!');
  }
  catch (error) {
  console.error('Error inserting data into the database:', error.message);
}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

