const Car = require("../models/Car.js");

module.exports.explore = async (req , res)=>{
    try {
        let carsData = await Car.find({ Availability: true }).sort({ Price: 1 });

        if(!carsData){
            return res.status(404).json({error:"No Data Found"})
        }
        res.status(200).json(carsData);
    } catch (error) {
        res.status(500).json({error:'An error occurred while fetching cars data'})
    }
    
}