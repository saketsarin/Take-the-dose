const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());


console.log('app')

app.use(express.json({ limit: '100kb' }));


app.use(require('./routes/patient-router'));

app.listen(3000)
module.exports = app;

