const mongoose = require("mongoose");
const Customer = require("../models/Customer.js")

async function Main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Car_Dealership");
}
Main().then(()=>{console.log("Database connected")}).catch((err)=>{console.log(err)});

async function addCustomer(){
    await Customer.insertMany([
            {
                First_Name: "Ahmed",
                Last_Name: "Shah",
                CNIC: 3210123456789,
                Gender: "Male",
                Date_of_Birth: "1990-04-15",
                Email_Address: "ahmed.shah@gmail.com",
                Phone_Number: "03123456789",
                Telephone: "02134567890",
                Address: "Karachi, Sindh"
            },
            {
                First_Name: "Zainab",
                Last_Name: "Khan",
                CNIC: 4210234567891,
                Gender: "Female",
                Date_of_Birth: "1995-08-20",
                Email_Address: "zainab.khan@yahoo.com",
                Phone_Number: "03219876543",
                Telephone: "04212345678",
                Address: "Lahore, Punjab"
            },
            {
                First_Name: "Omar",
                Last_Name: "Rehman",
                CNIC: 3310123485678,
                Gender: "Male",
                Date_of_Birth: "1985-11-10",
                Email_Address: "omar.rehman@hotmail.com",
                Phone_Number: "03334567890",
                Telephone: "02198765432",
                Address: "Karachi, Sindh"
            },
            {
                First_Name: "Maira",
                Last_Name: "Iqbal",
                CNIC: 4210145654321,
                Gender: "Female",
                Date_of_Birth: "1992-01-05",
                Email_Address: "maira.iqbal@gmail.com",
                Phone_Number: "03023456789",
                Telephone: "04211223344",
                Address: "Rawalpindi, Punjab"
            },
            {
                First_Name: "Bilal",
                Last_Name: "Farooq",
                CNIC: 4220334567892,
                Gender: "Male",
                Date_of_Birth: "1993-09-12",
                Email_Address: "bilal.farooq@yahoo.com",
                Phone_Number: "03365478910",
                Telephone: "05112345678",
                Address: "Islamabad"
            },
            {
                First_Name: "Fatima",
                Last_Name: "Khan",
                CNIC: 3310153498765,
                Gender: "Female",
                Date_of_Birth: "1996-07-25",
                Email_Address: "fatima.khan@gmail.com",
                Phone_Number: "03451234567",
                Telephone: "02165432109",
                Address: "Karachi, Sindh"
            },
            {
                First_Name: "Tariq",
                Last_Name: "Javed",
                CNIC: 4210198765432,
                Gender: "Male",
                Date_of_Birth: "1998-05-30",
                Email_Address: "tariq.javed@hotmail.com",
                Phone_Number: "03324567890",
                Telephone: "04299887766",
                Address: "Lahore, Punjab"
            },
            {
                First_Name: "Noor",
                Last_Name: "Ahmed",
                CNIC: 4210176543210,
                Gender: "Female",
                Date_of_Birth: "1988-03-11",
                Email_Address: "noor.ahmed@gmail.com",
                Phone_Number: "03124567890",
                Telephone: "02123456789",
                Address: "Karachi, Sindh"
            },
            {
                First_Name: "Asad",
                Last_Name: "Siddiqui",
                CNIC: 3310162456781,
                Gender: "Male",
                Date_of_Birth: "1980-02-22",
                Email_Address: "asad.siddiqui@yahoo.com",
                Phone_Number: "03051234567",
                Telephone: "04256789123",
                Address: "Lahore, Punjab"
            }
        ]
    )
}

addCustomer();