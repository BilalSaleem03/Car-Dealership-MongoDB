const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    Image: {
        url: {
            type: String,
            required: true 
        },
        filename: {
            type: String,
            required: true
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
        required:true,
        unique: true,
        min: 0
    },
    Gender: {
        type: String,
        required:true
    },
    Date_of_Birth: {
        type: Date,
        required:true
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
        required:true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
