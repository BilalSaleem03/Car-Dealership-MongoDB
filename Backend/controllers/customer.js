const mongoose = require("mongoose");
const Customer = require("../models/Customer.js");

module.exports.allCustomers = async (req , res)=>{
    try {
        let customersData = await Customer.find({});
        if(!customersData){
            return res.status(404).json({error : "No Customer Found"});
        }
        res.status(200).json(customersData)   //array of objects  
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching customer data' });
    }
}

module.exports.specificCustomer = async (req , res)=>{
    let {id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid customer ID format' });
    }
    try {
        let customerData = await Customer.findById(id);
        if (!customerData) {
            console.log("in if condition")
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customerData);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ error: 'An error occurred while fetching customer data' });
        
    }
}

module.exports.addCustomer = async (req, res) => {
    let imageURL = req.file.path;
    let imageFileName = req.file.filename;
    let customerData = req.body;
    let ack;
    try {
        ack = await Customer.create({
            Image: {
                url: imageURL, // Store image path in DB
                filename: imageFileName
            },
            First_Name: customerData.firstName,
            Last_Name: customerData.lastName,
            CNIC: customerData.cnic,
            Gender: customerData.gender,
            Date_of_Birth: new Date(customerData.DOB),
            Email_Address: customerData.email,
            Phone_Number: customerData.phone,
            Telephone: customerData.telephone,
            Address: customerData.address
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
    res.status(200).json({Success : "Successfully Submitted"});
}

module.exports.updateCustomer = async (req, res) => {
    let {id} = req.params;
    let customerData = req.body;
    let imageURL = req.file?.path;
    let imageFileName = req.file?.filename;
    let ack;
    let updatedcustomerInfo;
    if(req.file){
        updatedcustomerInfo = {
            Image: {
                url: imageURL, // Store image path in DB
                filename: imageFileName
            },
            First_Name: customerData.firstName,
            Last_Name: customerData.lastName,
            CNIC: customerData.cnic,
            Gender: customerData.gender,
            Date_of_Birth: new Date(customerData.DOB),
            Email_Address: customerData.email,
            Phone_Number: customerData.phone,
            Telephone: customerData.telephone,
            Address: customerData.address
        }
    } else {
        updatedcustomerInfo = {
            First_Name: customerData.firstName,
            Last_Name: customerData.lastName,
            CNIC: customerData.cnic,
            Gender: customerData.gender,
            Date_of_Birth: new Date(customerData.DOB),
            Email_Address: customerData.email,
            Phone_Number: customerData.phone,
            Telephone: customerData.telephone,
            Address: customerData.address
        }
    }
    try {
        ack = await Customer.findByIdAndUpdate(id , updatedcustomerInfo );
    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
    res.status(200).json({Success : "Successfully Submitted"});
}