const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.use(express.static('dist'));

app.listen(8080, function () {
    console.log('listening on port 8080');
    console.log('Go to: http://localhost:8080/');
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
    res.render('index.html');
});
