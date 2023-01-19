const mongoose = require ('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongoose = async() => {
    mongoose.connect(mongoURI, console.log('ok'))
.then(()=>console.log("Database connented!"))
.catch(err => console.log(err));
    }

module.exports = connectToMongoose;