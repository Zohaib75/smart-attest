const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;
var  cors = require ('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  };


const url = 'mongodb://localhost:27017/ibcc'
let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors(corsOptions));

function HasRole(role) {
    return function(req, res, next) {

        req.data = role.db('ibcc')
        next()

    }
}
  

const   insertDoc = (db) => {

    const myAwesomeDB = db.db('ibcc')
    const collection = myAwesomeDB.collection('student-data')
  

    let obj = { 
        cnic:        '3520254404455', 
        name:        'Zohaib Sohail',
        Father_name: 'Sohail Butt',
        Address:     'H#3, Street# 73, Davis Road',
        city:        'Lahore',
        email:       'zohaib.butt75@ucp.edu.pk',
        mobile:      '03224704185',
        matric:      82.22,
        inter:       71
    }


    let obj1 = { 
        cnic:        '3520254404411', 
        name:        'Ali Khan',
        Father_name: 'Shamal Khan',
        Address:     'H#3, Street# 73, Abbot Road',
        city:        'Lahore',
        email:       'zohaib.butt75@ucp.edu.pk',
        mobile:      '03224704185',
        matric:      82.22,
        inter:       71
    }

    

    let obj2 = { 
        cnic:        '3520254412233', 
        name:        'Abdullah Amin',
        Father_name: 'Ammin Dogar',
        Address:     'H#3, Street# 73, Empress Road',
        city:        'Lahore',
        email:       'zohaib.butt75@ucp.edu.pk',
        mobile:      '03224704185',
        matric:      82.22,
        inter:       71
    }

    

    collection.insertMany([obj,obj1,obj2], (error, result) => {
  
      if (error) return error

  
    })
  }

  flag = true;
  

mongodb.MongoClient.connect(url, { useNewUrlParser: true },(error, db) => {

    if (error)
    console.log(error)

    if(flag)
    insertDoc(db);


  var middlware_hasRoleAdmin = HasRole(db); //define router only once


app.get('/:cnic' ,middlware_hasRoleAdmin, (req, res) =>{

        req.data.collection('student-data').find({cnic: req.params.cnic} ,{sort: {_id :-1}}).toArray( (error, accounts) =>{

            if (error) return next(error)
            res.json(accounts)

        })

    })




    app.listen(2001)
    console.log('IBCC Running on port 2001');
})
