const mongoose =  require('mongoose')

const Notification = new mongoose.Schema  ({
  title : {type : String , require:true},
  content: {type :String  , required: true},
  date: {type : Date ,  require:true},
  createdAt : {type : Date , default:Date,now},
  
})