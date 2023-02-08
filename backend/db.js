const monggoose = require('mongoose')

const mongoURI = process.env.connectionString || "mongodb://localhost:27017/inotebook"
monggoose.set('strictQuery', true)

const connectToMongo = async () => {
    try {
        monggoose.connect(mongoURI)
        console.log("connected to mongoose successfully");

    } catch (error) {
        console.log("error occured during connection");

    }

}

module.exports = connectToMongo