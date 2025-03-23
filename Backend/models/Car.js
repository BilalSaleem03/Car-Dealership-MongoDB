const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
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
    Car_Owner: {
        type: String,
        lowercase : true,
        trim : true,
        required : true
    },
    Car_Name: {
        type: String,
        required: true
    },
    Manufacturer: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    Model_Number:{
        type: Number,
        required: true,
        min: 0
    },
    Engine_Type: {
        type: String,
        required: true
    },
    Engine_Number: {
        type: String,
        required: true
    },
    Car_Type: {          //SUV , Sedan , Hatchback , Mini , Van
        type: String,
        required: true
    },
    Mileage: {
        type: Number,
        required: true,
        min: 0
    },
    Accidental: {
        type: Boolean,
        default: false
    },
    Price: {
        type: Number,
        required: true,
        min: 0
    },
    Availability: {
        type: Boolean,
        default: true
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

