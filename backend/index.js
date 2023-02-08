const connectToMongo = require("./db")
const express = require('express')
const cors = require('cors')
const ip = require('./getIp')
connectToMongo()

const app = express()
const port = process.env.port || 4000
const host = ip || 'localhost'
app.use(cors())
app.use(express.json())


// available Routes

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(port, ip, () => {
    console.log(`app is listening on part http://${ip}:${port}`);
})