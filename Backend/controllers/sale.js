const Sale = require("../models/Sale.js");
const Employee = require("../models/Employee.js");
const Customer = require("../models/Customer.js");
const Car = require("../models/Car.js");

module.exports.sale = async (req, res) => {
    const salesData = req.body;
    let customer_id;
    let employee_id;
    try {
        customer_id = await Customer.find({ CNIC: salesData.customer_cnic },{ _id: 1 })
        if(customer_id.length === 0){
            return res.status(404).json({error : "No Customer Found Having given CNIC"})
        }
        customer_id = customer_id[0]._id;

        employee_id = await Employee.find({ CNIC: salesData.salesperson_cnic },{ _id: 1 })
        if(employee_id.length === 0){
            return res.status(404).json({error : "No Employee Found Having given CNIC"})
        }
        employee_id = employee_id[0]._id;

        ack = await Sale.create({
            Car_Id : salesData.car_ID,
            Customer_Id : customer_id,
            Employee_Id : employee_id,
            Sale_Date : salesData.sales_date,
            Asked_Amount : salesData.asked_amount,
            Given_Amount : salesData.given_amount,
            Payment_Method : salesData.payment_method
        })

        const ack2 = await Car.updateOne({_id : salesData.car_ID} , {Availability : false});

    } catch (error) {
        console.log(error)
        return res.status(404).json({error : "something went wrongnn" })
    }
    return res.status(200).json({success : "Successfully made a sale"});

}