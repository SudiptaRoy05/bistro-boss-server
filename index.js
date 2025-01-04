require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lue0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const database = client.db('bistroboss')
        const menuCollection = database.collection('menu');
        const reviewCollection = database.collection('reviews');
        const cartCollection = database.collection('carts')

        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        })

        app.post('/carts', async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        })

    } finally {

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send("Bistro-Boss Running");
})

app.listen(port, () => {
    console.log(`Bistro Boss server running on port ${port}`)
})