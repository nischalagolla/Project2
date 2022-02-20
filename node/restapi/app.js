let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongoUrl = "mongodb://localhost:27017"
const mongoUrl = "mongodb+srv://test:test123@cluster0.dbjee.mongodb.net/Lenskart?retryWrites=true&w=majority"
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
let port = process.env.PORT || 8210;
var db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

//get 
app.get('/',(req,res) => {
    res.send("Welcome to express")
})

//location
app.get('/location',(req,res) => {
    db.collection('location').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//brands
app.get('/brands',(req,res) => {
    db.collection('brands').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//category
app.get('/category',(req,res) => {
    db.collection('category').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})
//glasses
app.get('/items',(req,res) => {
    let glassId  = Number(req.query.id)
    console.log(">>>>glassId",glassId)
    db.collection('items').find({"technical.state_id":glassId}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

// app.get('/items',(req,res) => {
//     let stateId  = req.query.stateId;
//     let catId = Number(req.query.catId);
//     let query = {};
//      if(stateId && catId){
//          query = {category_id:catId,"technical.state_id":stateId}
//     }
//     if(stateId){
//         query = {"technical.state_id":stateId}
//     }
//      else if(catId){
//          query = {category_id:catId}
//      }
//     console.log(">>>state_id",stateId)
//     db.collection('items').find({query}).toArray((err,result) =>{
//         if(err) throw err;
//         res.send(result)
//     })
// })


//filters
app.get('/filter/:id', (req,res) => {
    let catId = Number(req.params.catId)
    db.collection('items').find({category_id:catId}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
    })
})

//place order
app.post('/placeOrder',(req,res) => {
    //console.log(req.body)
    db.collection('orders').insert(req.body,(err,result) =>{
        if(err) throw err;
        res.send('Order Added')
    })
})

// delete order
app.delete('/deleteOrder',(req,res) => {
    db.collection('orders').remove({},(err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


//update order
app.put('/updateOrder/:id',(req,res) => {
    let oId = mongo.ObjectId(req.params.id)
    let status = req.query.status?req.query.status:'Pending'
    db.collection('orders').updateOne(
        {_id:oId},
        {$set:{
            "status":status,
            "bank_name":req.body.bank_name,
            "bank_status":req.body.bank_status
        }},(err,result)=>{
            if(err) throw err;
            res.send(`Status Updated to ${status}`)
        }
    )
})



MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('Lenskart');
    app.listen(port,()=>{
        console.log(`listening on port no ${port}`)
    });
})


