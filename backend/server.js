const express = require('express')
const { Pool } = require('pg');
const app = express();

const PORT = 8080;

//PostgreSql
const pool = new Pool({
    host: 'db',
    user: 'postgres',
    password:'8046',
    database:'docker',
    port:5432
});


app.get('/v1/api', (req, res)=>{
    res.json({message: 'server is running'});
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`); 
});

