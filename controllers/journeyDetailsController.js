const journeyDetailsModel=require("../models/journeyDetailsModel")
const journeyDetails_get = async (req, res) => {

    try {
        const page = req.query.page
        const limit = req.query.limit

        const result = await journeyDetailsModel.find()
        console.log(result)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const resultUsers = result.slice(startIndex, endIndex)
        res.send(resultUsers)

    }
    catch (err) {
        console.log(err)
        res.send({ code: "404", message: "Unnable to fetch journeyDetails" })
    }
}


const journeyDetails_post = async (req, res) => {
    try {
        const doc = await new journeyDetailsModel({
            from: req.body.from,
            to: req.body.to,
            journeyDate: req.body.journeyDate,
            isTravelled: req.body.isTravelled,
            personal_details_id:req.body.personal_details_id

        })
        const result = await doc.save()
        console.log(result)
        res.send({ code: "200", message: "sucessfull journeyDetails" })
    }
    catch (err) {
        console.log(err)
        res.send({ code: "404", message: "Unsucessfull journeyDetails" })

    }
}


const journeyDetails_update = async (req, res) => {
    try {
        const result = await journeyDetailsModel.findByIdAndUpdate(req.query.id, req.body)
        console.log(result)
        res.send({ code: "200", message: "sucessfully updated" })
    }
    catch (err) {
        console.log(err)
        res.send({ code: "404", message: "Unnable to update journeyDetails" })

    }
}

const journeyLookup=async(req,res)=>
{
    try
    {
        const result=await journeyDetailsModel.aggregate([
            {
              
                $lookup:
                {
                    from:"personaldetails",
                    localField:"personal_details_id",
                    foreignField:"_id",
                    as:"personalDetails"
                }
            },
            {$unwind:"$paymentDetails"}
          
        ])
        console.log(result)
        res.send(result)
    }
    catch(err)
    {
        console.log(err)
        res.send("unnable to connect")
    }  
}

module.exports={journeyDetails_get,journeyDetails_post,journeyDetails_update,journeyLookup}