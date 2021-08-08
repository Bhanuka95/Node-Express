const exp = require('constants');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');



const hostname = 'localhost';
const port = 3000;


const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());//pass in json format

app.use('/dishes', dishRouter); //any request comming with /dishes will be handled by dishRouter file
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use(express.static(__dirname + '/public')); //roots of this project



app.use((req, res, next) => { //next - optional
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}`);
});