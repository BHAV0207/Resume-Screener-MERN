const mongoose = require('mongoose')

const connectDB =async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("db connected")
  }
  catch(err){
    console.log("failed to connect ")
  }
}


module.exports = connectDB;