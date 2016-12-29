const internalIp = require('internal-ip');
const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
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
    mongoClient.connect(url, (err, db) => {
      assert.equal(null, err);

      res.set('Content-Type', 'text/plain');
      res.status(200);
      res.send("Connected successfully to server!\n");

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

                res.set('Content-Type', 'text/plain');
                res.status(200);
                res.send("Successfully added " + req.body.firstName + " " + req.body.lastName + " to database.\n");

                db.close();
            });
        });
    });

app.route('/get-user')
    .get((req, res, next) => {
        res.sendFile(__dirname + "/views/get-user.html");
    })
    .post((req, res, next) => {
        mongoClient.connect(url, (err, db) => {
            assert.equal(null, err);

            const query = {};
            if (req.body.firstName) {
                query.firstName = req.body.firstName;
            }
            if (req.body.lastName) {
                query.lastName = req.body.lastName;
            }
            if (req.body.uid) {
                query._id = ObjectId(req.body.uid);
            }

            const collection = db.collection('users');
            collection.find(query).toArray((err, docs) => {
                assert.equal(err, null);
                assert.notEqual(docs.length, 0);

                res.set('Content-Type', 'text/plain');
                res.status(200);
                res.json(docs);

                db.close();
            });
        });
    });

app.route('/delete-user')
    .get((req, res, next) => {
        res.sendFile(__dirname + "/views/delete-user.html");
    })
    .post((req, res, next) => {
        mongoClient.connect(url, (err, db) => {
            assert.equal(null, err);

            const query = {};
            if (req.body.uid) {
                query._id = ObjectId(req.body.uid);
            }

            const collection = db.collection('users');
            assert.equal(query.hasOwnProperty("_id"), true);
            collection.findOneAndDelete(query, (err, result) => {
                assert.equal(err, null);

                res.set('Content-Type', 'text/plain');
                res.status(200);
                res.send("Removed the document with the uid: " + query._id);

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
