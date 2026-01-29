

const mongoose = require("mongoose");
const Car = require("../models/Car.js");


module.exports.catagoryCar = async (req , res)=>{
    let {type} = req.params;
    // console.log(type);
    try {
        let carsData = await Car.find({ Car_Type : type , Availability : true});
        if(!carsData){
            return res.status(404).json({error : "No Relevent Data Found"})
        }
        // console.log(carsData);
        res.status(200).json(carsData);
    } catch (error) {
        res.status(500).json({error : "Some error occur while getting Cars Data"})
    }
}

module.exports.specificCar = async(req , res)=>{
    let {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(500).json({error : "Invalid ID Formate"});
    }
    try{
        let carData = await Car.findById(id);
        if(!carData){
            return res.status(404).json({error : "No Data Found"})
        }
        res.status(200).json(carData);

    } catch(error){
        res.status(500).json({error : "Some Error occure while fetching Data"})
    }
}

module.exports.deleteCar = async(req , res)=>{
    let {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(500).json({error : "Invalid ID Formate"});
    }
    let ack;
    try{
        ack = await Car.findByIdAndDelete(id);
    } catch(error){
        res.status(404).json({error : "something went wrong"});
        return;
    }
    res.status(200).json({Success : "Car deleted Successfully"});
}

module.exports.addCar = async (req, res) => {
    let carData = req.body;
    let imageURL = req.file.path;
    let imageFileName = req.file.filename;
    // console.log(carData);
    try {
        let ack = await Car.create({
            Image: {
                url: imageURL, // Store image path in DB
                filename: imageFileName
            },
            Car_Owner: req.user.username.toString(),
            Car_Name: carData.carName,
            Manufacturer: carData.manufacturer,
            Color: carData.color,
            Model_Number: carData.model,
            Engine_Type: carData.engineType,
            Engine_Number: carData.engineNumber,
            Car_Type:carData.carType,
            Mileage: carData.mileage,
            Accidental: carData.accidental,
            Price: carData.price,
            Availability: carData.availability
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
    res.status(200).json({Success : "Successfully Submitted"});
}

module.exports.updateCar = async (req, res) => {
    let {id} = req.params;
    let carData = req.body;
    let imageURL = req.file?.path;
    let imageFileName = req.file?.filename;
    let ack;
    let updatedCarInfo;
    if(req.file){
        updatedCarInfo = {
            Image: {
                url: imageURL, // Store image path in DB
                filename: imageFileName
            },
            Car_Name: carData.carName,
            Manufacturer: carData.manufacturer,
            Color: carData.color,
            Model_Number: carData.model,
            Engine_Type: carData.engineType,
            Engine_Number: carData.engineNumber,
            Car_Type:carData.carType,
            Mileage: carData.milage,
            Accidental: carData.accidental,
            Price: carData.price,
            Availability: carData.availability
        }
    } else {
        updatedCarInfo = {
            Car_Name: carData.carName,
            Manufacturer: carData.manufacturer,
            Color: carData.color,
            Model_Number: carData.model,
            Engine_Type: carData.engineType,
            Engine_Number: carData.engineNumber,
            Car_Type:carData.carType,
            Mileage: carData.milage,
            Accidental: carData.accidental,
            Price: carData.price,
            Availability: carData.availability
        }
    }
    try {
        ack = await Car.findByIdAndUpdate(id , updatedCarInfo);
    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
    res.status(200).json({Success : "Successfully Submitted"});
}