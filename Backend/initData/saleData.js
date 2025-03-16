const mongoose = require("mongoose");
const Sale = require("../models/Sale.js")

async function Main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Car_Dealership");
}
Main().then(()=>{console.log("Database connected")}).catch((err)=>{console.log(err)});

async function addSale(){
    await Sale.insertMany([
            {
                Car_Id: "6745c99c770772fa9e12cf56",  // Car reference (car id should be a valid car id from the Car collection)
                Customer_Id: "6745c89ddd4fe1b236b1e541", // Customer reference (customer id should be a valid customer id from the Customer collection)
                Employee_Id: "6745c7c7a796b03fb87423b9", // Salesperson reference (employee id should be valid salesperson id from Salesperson collection)
                Sale_Date: "2024-11-01",
                Asked_Amount: 2000000,
                Given_Amount: 2000000,
                Payment_Method: "Cash"
            },
            {
                Car_Id: "6745c99c770772fa9e12cf57", // Car reference
                Customer_Id: "6745c89ddd4fe1b236b1e542", // Customer reference
                Employee_Id: "6745c7c7a796b03fb87423ba", // Salesperson reference
                Sale_Date: "2024-11-05",
                Asked_Amount: 3500000,
                Given_Amount: 3300000,
                Payment_Method: "Cash"
            },
            {
                Car_Id: "6745c99c770772fa9e12cf5b", // Car reference
                Customer_Id: "6745c89ddd4fe1b236b1e543", // Customer reference
                Employee_Id: "6745c7c7a796b03fb87423b9", // Salesperson reference
                Sale_Date: "2024-11-07",
                Asked_Amount: 9500000,
                Given_Amount: 9400000,
                Payment_Method: "Bank Transfer"
            },
            {
                Car_Id: "6745c99c770772fa9e12cf61", // Car reference
                Customer_Id: "6745c89ddd4fe1b236b1e544", // Customer reference
                Employee_Id: "6745c7c7a796b03fb87423ba", // Salesperson reference
                Sale_Date: "2024-11-10",
                Asked_Amount: 2200000,
                Given_Amount: 2100000,
                Payment_Method: "Credit Card"
            },
            {
                Car_Id: "6745c99c770772fa9e12cf63", // Car reference
                Customer_Id: "6745c89ddd4fe1b236b1e544", // Customer reference
                Employee_Id: "6745c7c7a796b03fb87423ba", // Salesperson reference
                Sale_Date: "2024-11-12",
                Asked_Amount: 3500000,
                Given_Amount: 3500000,
                Payment_Method: "Cash"
            }

    ])
}


// addSale();