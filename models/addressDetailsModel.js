const mongoose=require("mongoose")
const addressDetailsSchema=new mongoose.Schema({
address: { type: String, required: true },
city: { type: String, required: true },
state: { type: String, required: true },
country: { type: String, required: true },
personal_details_id:{type: mongoose.Schema.Types.ObjectId,ref:"personalDetail"}
})

const addressDetailsModel=mongoose.model("addressDetail",addressDetailsSchema)
module.exports=addressDetailsModel
