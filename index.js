const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://127.0.0.1/database')

const db = mongoose.connection
db.on('error',()=> console.log("Error in connecting"))
db.once('open', () => console.log("connected to database"))
app.post("/signup",(req,res)=>{
    const name= req.body.name
    const age = req.body.age
    const email = req.body.email
    const password = req.body.password
    const phno = req.body.phno
    const gender = req.body.gender
     
    const data={
        "name":name,
        "age" : age ,
        "email" : email,
        "password" : password,
        "phno" : phno,
        "Gender" : gender
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted")
    })
    return res.redirect('signup_successfully.html')
})
app.get("/",(req,res)=>{
    res.set({
        "Access-Control-Allow-Origin":'*'
    })
    return res.redirect("index.html");
}).listen(3000);
console.log("Listen ")