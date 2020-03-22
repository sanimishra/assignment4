const express = require('express');
require('dotenv').config();
const port = process.env.UI_SERVER_PORT || 8000;
const app = express();
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };
app.get('/env.js', function(req, res) {
    res.send(`window.ENV = ${JSON.stringify(env)}`)
  })
 
app.use(express.static('public'));
app.listen(port, function () {
  console.log('UI started on port ${port}');
});