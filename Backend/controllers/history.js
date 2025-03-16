const Sale = require("../models/Sale.js");

module.exports.history = async(req , res)=>{
    try {
        let data = await Sale.find({});
        if(!data){
            return res.status(404).json({error : "No data Found"})
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({error : "Some Error Occure while fetching data"})
    }
}