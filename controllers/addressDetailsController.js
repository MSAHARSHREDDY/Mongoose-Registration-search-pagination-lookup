const { query } = require("express");
const addressDetailsModel=require("../models/addressDetailsModel")

const addressDetails_get = async (req, res) => {
    try {
        let total=await addressDetailsModel.countDocuments()
       
        let page=(req.query.page)
        let limit=(req.query.limit)
        const totalPages=Math.ceil(total/limit)
        const result = await addressDetailsModel.find({
            "$or":[
                {"city":{$regex:req.query.search,$options:"i"}},
                {"state":{$regex:req.query.search,$options:"i"}},
                {"country":{$regex:req.query.search,$options:"i"}}
            ]
            
        })

        console.log(result)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const resultUsers = result.slice(startIndex, endIndex)
        res.send({
            result:{
                data:resultUsers,
                meta:{
                    total:total,
                    currentPage:page,
                    perPage:limit,
                    totalPages:totalPages
                }
            }
        })

        // meta:{
        //     currentPage:startIndex,
        //     perPage:limit,
        // }

       

        // query.push({
        //     $skip:skip
        // })
        // query.push({
        //     $limit:limit
        // })

        //let data=await addressDetailsModel.aggregate(query)



       

       
    } catch (err) {
        console.log(err);
        res.send("unnable fetch data");
    }
};

const addressDetails_post = async (req, res) => {
    try {
        const doc = await new addressDetailsModel({
              
    
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            personal_details_id:req.body.personal_details_id
         
        });
        const result = await doc.save()
        console.log(result);
        res.send("successfull addressDetail");
    } catch (err) {
        console.log(err);
        res.send("failed addressDetail");
    }
};



const addressLookup=async(req,res)=>
{
    try
    {
        const result1 = await addressDetailsModel.aggregate([
           
            {$match:{$or:[
                
                {"city":{$regex:req.query.search,$options:"i"}},
                {"state":{$regex:req.query.search,$options:"i"}},
                {"country":{$regex:req.query.search,$options:"i"}}
            ]}},

        {     
            $lookup:
            {
                from: "personaldetails",//need to take from database collections
                localField: "personal_details_id",
                foreignField: "_id",
                as: "personalDetails"
            } 
        },
        {   $unwind:"$personalDetails" },
    ])
        console.log(result1)
        res.send(result1)  
    }
    catch(err)
    {
        console.log(err)
        res.send("unnable to connect")
    }
}


module.exports={addressDetails_get,addressDetails_post,addressLookup}