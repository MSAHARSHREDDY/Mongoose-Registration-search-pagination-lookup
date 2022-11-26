const mongoose=require("mongoose")
const connectDB=()=>
{
    try{
        mongoose.connect("mongodb://localhost:27017/userRegistration")
        console.log("connected successfully")
    }
    catch(err)
    {
        console.log(err)
    }
    
}
module.exports=connectDB
   