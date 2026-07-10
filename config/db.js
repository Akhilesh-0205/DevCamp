const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoUrl");

const database = async() => {
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected...");
    }catch(err){
        console.error(err.message);
        //exit
        process.exit(1)
    }
}

module.exports = database;