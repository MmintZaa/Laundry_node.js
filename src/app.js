require("dotenv/config") //ดึงไฟล์ env มาให้
const {connectMongo} = require("./db/mongo")
const express = require('express');
const router = require('./routers');
const morgan = require("morgan");
const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);
app.use('', (req, res) => {
    res.send('Hello this is my API');
})

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message ?? "Internal Error",
        additionValue: err,
    })
})

// port 3000 is our machine port you can use other port
app.listen(3000, async () => {
    console.log(process.env.MONGO_URL)
    await connectMongo()
    console.info('Hello This is my server run on: http://localhost:3000')
})
