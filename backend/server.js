const express = require('express')
const app = express();
const PORT = 8080;

app.get('/v1/api', (req, res)=>{
    res.json({message: 'server is running'});
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`); 
});