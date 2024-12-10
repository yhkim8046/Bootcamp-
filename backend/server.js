const express = require('express')
const { Pool } = require('pg');
const app = express();

require('dotenv').config();

const PORT = 8080;

//PostgreSql
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

app.get('/v1/api', (req, res)=>{
    res.json({message: 'server is running'});
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`); 
});

app.get('/v1/api/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Database connection successful', time: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database connection failed', error: err.message });
    }
});

