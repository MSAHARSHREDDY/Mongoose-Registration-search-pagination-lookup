const mongoose = require("mongoose")

const journeyDetailsSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    journeyDate: { type: Date, required: true },
    isTravelled: { type: Number, required: true },
    personal_details_id:{type: mongoose.Schema.Types.ObjectId,ref:"personalDetail"}
    
})
const journeyDetailsModel = mongoose.model("journeydetail", journeyDetailsSchema)
module.exports = journeyDetailsModel