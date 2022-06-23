const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const test = require('./Router/db_test');

app.use(cors());
app.use(bodyParser.json());
app.use('/', test);

const port=3001;
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});

