// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', (request, response) => {
  //const reqDate = request.params.date
  response.json({unix: Number(new Date().getTime()), utc: new Date()})

}) 

app.get('/api/:date', (request, response) => {
  const reqDate = request.params.date
 if (new Date(Number(reqDate)).toString() !== 'Invalid Date'){

   response.json({unix: Number(reqDate), utc: new Date(Number(reqDate)).toString()})
  
  } else if (new Date(reqDate).toString() !== 'Invalid Date') {
   response.json({unix: Number(new Date(reqDate).getTime()), utc: new Date(reqDate)})
  }
  else {

    response.json({error: 'Invalid Date'})
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
