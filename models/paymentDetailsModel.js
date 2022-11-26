const mongoose=require("mongoose")


const paymentDetailsSchema=new mongoose.Schema({
    paymentAmount:{type:Number,required:true},
    paymentDate:{type:Date,required:true},
    transaction_number:{type: Number,
        default : Math.floor(100000+Math.random()*900000),
        index: { unique: true }},
    paymentStatus:{type:String,default:null},
    journey_details_id:{type:mongoose.Schema.Types.ObjectId,ref:"journeydetail"}
     
})
const paymentDetailsModel=mongoose.model("paymentdetail",paymentDetailsSchema)
module.exports=paymentDetailsModel

