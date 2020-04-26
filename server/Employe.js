const mongoose = require('mongoose')

// model parsing data to DB
const EmployeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    picture: String,
    salary: String,
    position: String
})

mongoose.model("employe", EmployeSchema)