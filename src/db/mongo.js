const mongo = require('mongoose')


const connectMongo = async () => {
    try {
       // await mongo.connect('mongodb://root:example@localhost:27017/'); //hard code
        await mongo.connect(process.env.MONGO_URL);
        console.info("DB has been connected!");
    } catch (error) {
        console.log(error)
        console.error("Unable to connected with database");
        throw error;
    }
}


module.exports = { mongo, connectMongo };