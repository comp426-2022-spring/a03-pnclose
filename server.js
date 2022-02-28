// Require Express.js
// Start app
const express = require('express')
const app = express()

// Get port from terminal 
const args = require('minimist')(process.argv.slice(2));
args['port']
var port = args.port || 5000

// Use express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Log request body and reponse body
const logging = (req, res, next) => {
    console.log(req.body.number)
    next()
}

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// ------------------------------------------------------------------------------
// -------------------------------- COIN STUFF ----------------------------------
// ------------------------------------------------------------------------------
function coinFlip() {
    return Math.random() < 0.5 ? ('heads') : ('tails')
}

function coinFlips(flips) {
    const arr = []
    for(let i = 0; i<flips; i++) {
      arr[i] = coinFlip()
    }
    return arr
}


function countFlips(flips) {
    let hCnt = 0
    let tCnt = 0
    for(let i=0; i<flips.length; i++) {
      if(flips[i] == 'heads') {
        hCnt++;
      } else {
        tCnt++;
      }
    }
  
    if(hCnt == 0) {
      return {tails: tCnt}
    }
    if(tCnt == 0) {
      return {heads: hCnt}
    }
    return { heads: hCnt, tails: tCnt }
}


function flipACoin(call) {
    let res = coinFlip()
    var result;
    if(call == res) {
      
      result = 'win'
    } else {
      result = 'lose'
    }
    return { call: call, flip: res, result: result }
}
  
// ------------------------------------------------------------------------------
// -------------------------------- ENDPOINTS ----------------------------------
// ------------------------------------------------------------------------------

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type("text/plain")
})

app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.get('/app/flip/', (req, res) => {
    var temp = coinFlip()
    res.status(200).json({'flip' : temp})
})

app.get('/app/flips/:number/', (req, res) => {
    var temp = coinFlips(req.params.number)
    res.status(200).json({'raw': temp, 'summary': countFlips(temp)})
})

// endpoints for heads and tails
app.get('/app/flips/heads/', (req, res) => {
    var temp = flipACoin('heads')
    res.status(200).json(temp)
})

app.get('/app/flips/tails/', (req, res) => {
  var temp = flipACoin('tails')
  res.status(200).json(temp)
})

app.use(function(req, res) {
  res.status(404).send("Endpoint does not exist")
  res.type("text/plain")
})








