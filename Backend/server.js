const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassOP';// Database Name

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect(); // Use connect method to connect to the server

//Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

//Add or save new password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send(findResult);
})

//Delete password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send(findResult);
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

