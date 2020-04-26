const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employe')

app.use(bodyParser.json())

// Model Employe
const Employe = mongoose.model("employe")

// Link Database MongoDB
const mongoUri = "mongodb://metabase:9uEGaT2qDgI96yo3@cluster0-shard-00-00-xsdbt.mongodb.net:27017,cluster0-shard-00-01-xsdbt.mongodb.net:27017,cluster0-shard-00-02-xsdbt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

// Start test Connected DB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongo hell yeah")
})

mongoose.connection.on("error", (err) => {
    console.log("error", err)
})
// End test Connected DB

// server port
app.listen(3000, () => {
    console.log("server running")
})

// get All data in database
app.get('/', (req, res) => {
    Employe.find({}).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

// save data
app.post('/send-data', (req, res) => {
    // console.log(req.body)
    const employe = new Employe({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    })
    employe.save().then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

// update data
app.post('/update', (req, res) => {
    Employe.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        salary: req.body.salary,
        picture: req.body.picture
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

// delete data
app.post('/delete', (req, res) => {
    Employe.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})