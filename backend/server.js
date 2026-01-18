const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'share_to_care'
});

db.connect(err => {
  if(err) throw err;
  console.log("Database connected ✅");
});

// Login API
app.post('/login', (req,res)=>{
  const {email,password} = req.body;
  const query = 'SELECT * FROM users WHERE email=? AND password=?';
  db.query(query,[email,password],(err,result)=>{
    if(err) return res.send({status:'error', message:err});
    if(result.length>0) res.send({status:'success', message:'Login successful 🎉'});
    else res.send({status:'fail', message:'Invalid credentials ❌'});
  });
});

// Donate API (UPDATED – with user email)
app.post('/donate', (req, res) => {
  const { item, quantity, email } = req.body;

  const query =
    'INSERT INTO donations (item, quantity, email) VALUES (?, ?, ?)';

  db.query(query, [item, quantity, email], (err, result) => {
    if (err) {
      return res.send({ status: 'error', message: err });
    }

    res.send({
      status: 'success',
      message: `Donated ${quantity} ${item}(s) ❤️`
    });
  });
});


// Dashboard API
app.get('/donations',(req,res)=>{
  db.query('SELECT * FROM donations',(err,results)=>{
    if(err) return res.send({status:'error', message:err});
    res.send(results);
  });
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000 🚀"));