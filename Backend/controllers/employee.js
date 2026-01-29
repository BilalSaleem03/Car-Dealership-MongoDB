const mongoose = require("mongoose");
const Employee = require("../models/Employee.js");

module.exports.allEmployees = async (req , res)=>{
    try {
        let employeesData = await Employee.find({});
        // console.log("wwwwwww")
        // console.log(employeesData);
        if(!employeesData){
            return res.status(404).json({error:"No data Found for that Employee"})
        } 
        res.status(200).json(employeesData)   //array of objects
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching employees data' });
    }
}

module.exports.specificEmployee = async (req , res)=>{
    let {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).send("Invalid ID formate sent")
    }
    try {
        let employeeData = await Employee.findById(id);
        if(!employeeData){
            return res.status(404).json({error:"No data Found for that Employee"})
        }
        res.status(200).json(employeeData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching employee data' });
    }
}

module.exports.addEmployee =  async (req, res) => {
    let employeeData = req.body;
    let ack;
    let imageURL = req.file?.path;
    let imageFileName = req.file?.filename;
    try {
        // console.log(employeeData)
        ack = await Employee.create({
            Image: {
                url: imageURL, // Store image path in DB
                filename: imageFileName
            },
            First_Name: employeeData.firstName,
            Last_Name: employeeData.lastName,
            CNIC: employeeData.cnic,
            Gender: employeeData.gender,
            Date_of_Birth: new Date(employeeData.DOB),
            Email_Address: employeeData.email,
            Phone_Number: employeeData.phone,
            Telephone: employeeData.telephone,
            Address: employeeData.address,
            Hire_Date: new Date(employeeData.hireDate),
            Designation: employeeData.designation,
            Salary: employeeData.salary,
            Commission_Rate: employeeData.commissionRate 
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }

    res.status(200).json({Success : "Successfully Submitted"});
}
module.exports.updateEmployee = async (req, res) => {
    let {id} = req.params;
    let employeeData = req.body;
    // console.log(req.body)
    let ack;
    let imageURL = req.file?.path;
    let imageFileName = req.file?.filename;

    let  updatedEmployee;
    if(req.file){
        // console.log("has file")
        updatedEmployee = {
            Image: {
                url: imageURL,
                filename: imageFileName
            },
            First_Name: employeeData.firstName,
            Last_Name: employeeData.lastName,
            CNIC: employeeData.cnic,
            Gender: employeeData.gender,
            Date_of_Birth: new Date(employeeData.DOB),
            Email_Address: employeeData.email,
            Phone_Number: employeeData.phone,
            Telephone: employeeData.telephone,
            Address: employeeData.address,
            Hire_Date: new Date(employeeData.hireDate),
            Designation: employeeData.designation,
            Salary: employeeData.salary,
            Commission_Rate: employeeData.commessionRate 
        }
    }
    else{
        
        // console.log("No file")
        updatedEmployee = {
            First_Name: employeeData.firstName,
            Last_Name: employeeData.lastName,
            CNIC: employeeData.cnic,
            Gender: employeeData.gender,
            Date_of_Birth: new Date(employeeData.DOB),
            Email_Address: employeeData.email,
            Phone_Number: employeeData.phone,
            Telephone: employeeData.telephone,
            Address: employeeData.address,
            Hire_Date: new Date(employeeData.hireDate),
            Designation: employeeData.designation,
            Salary: employeeData.salary,
            Commission_Rate: employeeData.commessionRate 
        }
    }
    try {

        ack = await Employee.findByIdAndUpdate(id , updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
    res.status(200).json({Success : "Successfully Submitted"});
}
