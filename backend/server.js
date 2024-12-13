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

app.listen(PORT, async () => {
    console.log(`Server is running on Port: ${PORT}`); 
    
    // 초기화 스크립트 실행
    await initializeDatabase();
});

async function initializeDatabase() {
    try {
        // counter 테이블 생성 쿼리
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS counter (
            id SERIAL PRIMARY KEY,
            count_value INT NOT NULL DEFAULT 0,
            createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        `;

        await pool.query(createTableQuery);
        console.log('counter table ensured or created');
        
        // 만약 특정 초기값을 넣고 싶다면 다음과 같이 추가 가능
        await pool.query(`
            INSERT INTO counter (count_value) 
            SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM counter WHERE id = 1);
        `);
        console.log('counter initialized with a default value if not present');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

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
      console.log(result.rows); // 디버깅용 로그
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Counter not found' });
      }
  
      res.json({ count_value: result.rows[0].count_value });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Database query failed', error: err.message });
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
