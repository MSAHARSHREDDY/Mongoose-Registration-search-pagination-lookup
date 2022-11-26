const mongoose=require("mongoose")
const personalDetailsSchema=new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: Number, required: true },

})

const personalDetailsModel=mongoose.model("personalDetail",personalDetailsSchema)
module.exports=personalDetailsModel