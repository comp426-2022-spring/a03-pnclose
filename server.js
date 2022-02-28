// Require Express.js
// Start app
const express = require('express')
const app = express()

// Get port from terminal 
const args = require('minimist')(process.argv.slice(2));
args['port']
var port = args.port || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

