const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;
var  cors = require ('cors');
const crypto = require('crypto');

const axios = require('axios');


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  };


const url = 'mongodb://localhost:27017/auth'
let app = express()

app.disable('x-powered-by');
app.use(logger('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cors(corsOptions));

function HasRole(role) {
    return function(req, res, next) {

        req.data = role.db('auth')
        next()

    }
}
  

mongodb.MongoClient.connect(url, { useNewUrlParser: true },(error, db) => {

    if (error)
    return console.log(error)

var middlware_hasRoleAdmin = HasRole(db); //define router only once

app.get('/all', middlware_hasRoleAdmin, (req, res) => {

    req.data.collection('user-data').find({}).toArray((err, result)=>{
        if (error)        
        res.status(404).json(error)

        else
        res.status(200).json(result)
        
    })

})

app.get( '/secret',middlware_hasRoleAdmin, (req, res)=>{

    req.data.collection('user-data').find({secretKey: req.query.secret} ,{sort: {_id :-1}}).toArray( (error, user) =>{

        if (error)        
        res.status(404).json(error)

        else if(user.length === 0){
            res.status(404).json("failure")
        }
        else{

            let obj = {
                id: user[0].id,
                type: user[0].type
            }

            res.status(200).json(obj)
        
        }



    })
})

//while creating a user
app.post('/user', middlware_hasRoleAdmin, (req, res) => {

    let id = req.body.id;
    let type = req.body.type;

    const myAwesomeDB = db.db('auth')
    const collection = myAwesomeDB.collection('user-data')
  
    let secret = new Date() + "buffer";
    const hash = crypto.createHmac('sha256', secret)
                    .update('I love cupcakes')
                    .digest('hex');
    

    let obj = { 
        secretKey: hash, 
        id,
        type
     }

    collection.insertOne(obj, (error, result) => {
        
  
      if (error) return error

    })
    res.status(200).json("added")
                                
})




    app.listen(2002)
    console.log('auth Running on port 2002');
})
