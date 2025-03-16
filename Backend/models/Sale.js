const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    Car_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Car'
    },
    Customer_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    Employee_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Salesperson'
    },
    Sale_Date: {
        type: Date,
        required: true
    },
    Asked_Amount: {
        type: Number,
        required: true,
        min: 0
    },
    Given_Amount: {
        type: Number,
        required: true,
        min: 0
    },
    Payment_Method: {
        type: String,
        required: true
    }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
