const express=require("express")
const personalDetailsController=require("../controllers/personalDetailsController")
const addressDetailsController=require("../controllers/addressDetailsController")
const journeyDetailsController=require("../controllers/journeyDetailsController")
const paymentDetailsController=require("../controllers/paymentDetailsController")


const router=express.Router()

//personalDetails
router.get("/personalDetails",personalDetailsController.personalData_get)
router.post("/personalDetails",personalDetailsController.personalData_post)

//addressDetails
router.get("/addressDetails",addressDetailsController.addressDetails_get)
router.post("/addressDetails",addressDetailsController.addressDetails_post)
router.get("/addressLookup",addressDetailsController.addressLookup)

//journeyDetails
router.get("/journeyDetails",journeyDetailsController.journeyDetails_get)
router.post("/journeyDetails",journeyDetailsController.journeyDetails_post)
router.post("/journeyDetailsUpdate",journeyDetailsController.journeyDetails_update)
router.get("/journeyLookup",journeyDetailsController.journeyLookup)

//paymentDetails
router.get("/paymentDetails",paymentDetailsController.paymentDetails_get)
router.post("/paymentDetails",paymentDetailsController.paymentDetails_post)
router.get("/paymentLookup",paymentDetailsController.paymentLookup)

//joinCollections




module.exports=router