const internalIp = require('internal-ip');
const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const port = 3001;
const mongoDBPort = 37001;
const ip = internalIp.v4();

// Connection URL
const url = 'mongodb://localhost:' + mongoDBPort + '/random-user-api';

app.get('/health-check', (req, res) => {
    // Use connect method to connect to the server
    mongoClient.connect(url, function(err, db) {
      assert.equal(null, err);

      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Connected successfully to server!\n");

      db.close();
    });
});

app.get('/', (req, res) => {
    res.redirect("/health-check");
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(' --------------------------------------------');
    console.log(' Server now running on the following ports...');
    console.log(' --------------------------------------------');
    console.log(`       Local: http://0.0.0.0:${port}`);
    console.log(`       External: http://${ip}:${port}`);
    console.log(' --------------------------------------------');
});
