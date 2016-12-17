const internalIp = require('internal-ip');
const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

const port = 3001;
const mongoDBPort = 37001;
const ip = internalIp.v4();

// Connection URL
const url = 'mongodb://localhost:' + mongoDBPort + '/random-user-api';

// Server Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect("/health-check");
});

app.get('/health-check', (req, res) => {
    // Use connect method to connect to the server
    mongoClient.connect(url, (err, db) => {
      assert.equal(null, err);

      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Connected successfully to server!\n");

      db.close();
    });
});

app.route('/add-user')
    .get((req, res, next) => {
        res.sendFile(__dirname + "/views/add-user.html");
    })
    .post((req, res, next) => {
        mongoClient.connect(url, (err, db) => {
            assert.equal(null, err);
            const collection = db.collection('users');
            collection.insertOne({
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
            }, {
                w: 'majority',
                wtimeout: 10000,
                serializeFunctions: true
            }, (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.insertedCount);

                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("Successfully added " + req.body.firstName + " " + req.body.lastName + " to database.\n");

                db.close();
            });
        });
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
