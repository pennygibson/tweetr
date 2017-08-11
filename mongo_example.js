"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGO_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGO_URI, (err, db) => {
    if(err) {
        console.error(`Failed to connect: ${MONGO_URI}`);
        throw err;
    }
    
    console.log(`Conneted to mongodb: ${MONGO_URI}`);
    
    db.collection("tweets").find({}, (err, results) =>{
        if (err) throw err;
        
        results.toArray((err, resultsArray)=> {
            if (err) throw err;
            console.log(resultsArray)
        }));
        
//        console.log("find result: ", resultsArray)
//        results.each((err, item) => console.log(" ", item));
    })
    
    
    
    db.close();
});