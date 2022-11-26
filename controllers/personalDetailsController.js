const personalDetailsModel=require("../models/personalDetailsModel")
const validations=require("validator");
const { check } = require("express-validator");
const personalData_get = async (req, res) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        const result = await personalDetailsModel.find({
            "$or":[
                {"name":{$regex:req.query.search,$options:"i"}}
            ]
        });
        console.log(result)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const resultUsers = result.slice(startIndex, endIndex)
        res.send(resultUsers)
    } catch (err) {
        console.log(err);
        res.send("unnable fetch data");
    }
};


const personalData_post = async (req, res) => {
    try {
        var validations = [
          check("name").trim().notEmpty().withMessage("name is required")
        ];
        for(let validation of validations){
            const result= await validation.run(req);
            if(result.errors.length<3)
            {
                return res.status(400).json({errors:result.errors})
            }
        }
        const doc = await new personalDetailsModel({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            contact: req.body.contact
        });
        const result = await doc.save();
        console.log(result);
        res.send("successfull personal Data");
    } catch (err) {
        console.log(err);
        res.send("failed again");
    }
};

module.exports={personalData_get,personalData_post}
