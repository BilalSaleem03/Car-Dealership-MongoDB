const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    Image: {
        url: {
            type: String, 
        },
        filename: {
            type: String,
        }
    },
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    CNIC: {
        type: Number,
        required: true,
        unique: true,
        min: 0
    },
    Gender: {
        type: String,
        required: true
    },
    Date_of_Birth: {
        type: Date,
        required: true
    },
    Email_Address: {
        type: String,
        required: true,
        unique: true
    },
    Phone_Number: {
        type: String,
        required: true
    },
    Telephone: {
        type: String
    },
    Address: {
        type: String,
        required: true
    },
    Hire_Date: {
        type: Date,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    Salary: {
        type: Number,
        required: true,
        min: 0
    },
    Commission_Rate: {
        type: Number,
        min: 0,
        max: 100
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
