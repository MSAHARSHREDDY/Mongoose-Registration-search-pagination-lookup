const paymentDetailsModel=require("../models/paymentDetailsModel")

const paymentDetails_get = async (req, res) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        var searchInt =parseInt(req.query.search); 

        const result = await paymentDetailsModel.find({"paymentAmount":searchInt})
        console.log(result)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const resultUsers = result.slice(startIndex, endIndex)
        res.send(resultUsers)
    }
    catch (err) {
        console.log(err)
        res.send({ code: "404", message: "Unnable to fetch paymentDetails" })
    }
}



const paymentDetails_post = async (req, res) => {
    try {
        const doc = await new paymentDetailsModel({
            paymentAmount: req.body.paymentAmount,
            paymentDate: req.body.paymentDate,
            journey_details_id:req.body.journey_details_id
        })
        const result = await doc.save()
        console.log(result)
        res.send({ code: "200", message: "sucessfull paymentDetails" })
    }
    catch (err) {
        console.log(err)
        res.send({ code: "404", message: "Unsucessfull paymentDetails" })
    }
}


const paymentLookup=async(req,res)=>
{
    try
    {
        const result=await paymentDetailsModel.aggregate([
            {
                $lookup:
                {
                    from:"journeydetails",
                    localField:"journey_details_id",
                    foreignField:"_id",
                    as:"journeyDetails"
                }
            },
            {$unwind:"$journeyDetails"}
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

module.exports={paymentDetails_get,paymentDetails_post,paymentLookup}
