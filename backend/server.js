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

const cors = require('cors');
app.use(cors());


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

app.get('/v1/api/counter', async (req, res) => {
    try {
        const result = await pool.query('SELECT count_value FROM counter WHERE id = 1');
        res.json({ count: result.rows[0].count_value });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch count', error: err.message });
    }
});

app.post('/v1/api/counter', async (req, res) => {
    try {
        await pool.query('UPDATE counter SET count_value = count_value + 1 WHERE id = 1');
        const result = await pool.query('SELECT count_value FROM counter WHERE id = 1');
        res.json({ message: 'Count updated successfully', count: result.rows[0].count_value });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update count', error: err.message });
    }
});
