const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true }))


//Import Routes 
const user = require('./Routes/userRoute');
const report = require('./Routes/ReportRoute');
const category = require('./Routes/CategoryRoute');




//Configure Route For maain App
app.use('/api/v1', user)
app.use('/api/v1', report)
app.use('/api/v1', category)


module.exports = app
