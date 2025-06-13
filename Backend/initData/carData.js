const mongoose = require("mongoose");
const Car = require("../models/Car.js")

async function Main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Car_Dealership");
}
Main().then(()=>{console.log("Database connected")}).catch((err)=>{console.log(err)});

async function addCar(){
    await Car.insertMany([
        {
            Car_Name: "Cultus",
            Manufacturer: "Suzuki",
            Color: "Blue",
            Model_Number: 2020,
            Engine_Type: "I3",
            Engine_Number: "ENG1122334455",
            Car_Type: "Hatchback",
            Mileage: 25000,
            Accidental: false,
            Price: 2000000,
            Availability: true
        },
        {
            Car_Name: "City",
            Manufacturer: "Honda",
            Color: "Black",
            Model_Number: 2021,
            Engine_Type: "I4",
            Engine_Number: "ENG5566778899",
            Car_Type: "Sedan",
            Mileage: 10000,
            Accidental: false,
            Price: 3500000,
            Availability: true
        },
        {
            Car_Name: "Mehran",
            Manufacturer: "Suzuki",
            Color: "Silver",
            Model_Number: 2019,
            Engine_Type: "I3",
            Engine_Number: "ENG2233445566",
            Car_Type: "Hatchback",
            Mileage: 40000,
            Accidental: false,
            Price: 1000000,
            Availability: true
        },
        {
            Car_Name: "Sportage",
            Manufacturer: "Kia",
            Color: "Grey",
            Model_Number: 2021,
            Engine_Type: "I4",
            Engine_Number: "ENG6677889900",
            Car_Type: "SUV",
            Mileage: 15000,
            Accidental: false,
            Price: 6200000,
            Availability: true
        },
        {
            Car_Name: "Swift",
            Manufacturer: "Suzuki",
            Color: "Red",
            Model_Number: 2020,
            Engine_Type: "I4",
            Engine_Number: "ENG9988776655",
            Car_Type: "Hatchback",
            Mileage: 20000,
            Accidental: false,
            Price: 2300000,
            Availability: true
        },
        {
            Car_Name: "Fortuner",
            Manufacturer: "Toyota",
            Color: "White",
            Model_Number: 2022,
            Engine_Type: "V6",
            Engine_Number: "ENG4433221100",
            Car_Type: "SUV",
            Mileage: 5000,
            Accidental: false,
            Price: 9500000,
            Availability: true
        },
        {
            Car_Name: "Alto",
            Manufacturer: "Suzuki",
            Color: "Black",
            Model_Number: 2019,
            Engine_Type: "I3",
            Engine_Number: "ENG3344556677",
            Car_Type: "Hatchback",
            Mileage: 30000,
            Accidental: false,
            Price: 1600000,
            Availability: true
        },
        {
            Car_Name: "Tucson",
            Manufacturer: "Hyundai",
            Color: "Blue",
            Model_Number: 2021,
            Engine_Type: "I4",
            Engine_Number: "ENG9988997766",
            Car_Type: "SUV",
            Mileage: 10000,
            Accidental: false,
            Price: 6000000,
            Availability: true
        },
        {
            Car_Name: "Mini Cooper",
            Manufacturer: "BMW",
            Color: "Green",
            Model_Number: 2022,
            Engine_Type: "I3",
            Engine_Number: "ENG1234987654",
            Car_Type: "Mini",
            Mileage: 8000,
            Accidental: false,
            Price: 4500000,
            Availability: true
        },
        {
            Car_Name: "Vitz",
            Manufacturer: "Toyota",
            Color: "Yellow",
            Model_Number: 2020,
            Engine_Type: "I4",
            Engine_Number: "ENG2345678901",
            Car_Type: "Hatchback",
            Mileage: 15000,
            Accidental: false,
            Price: 2500000,
            Availability: true
        },
        {
            Car_Name: "Hiace",
            Manufacturer: "Toyota",
            Color: "White",
            Model_Number: 2018,
            Engine_Type: "I4",
            Engine_Number: "ENG3456789012",
            Car_Type: "Van",
            Mileage: 40000,
            Accidental: false,
            Price: 5000000,
            Availability: true
        },
        {
            Car_Name: "Passo",
            Manufacturer: "Toyota",
            Color: "Pink",
            Model_Number: 2021,
            Engine_Type: "I3",
            Engine_Number: "ENG4567890123",
            Car_Type: "Hatchback",
            Mileage: 10000,
            Accidental: false,
            Price: 2200000,
            Availability: true
        },
        {
            Car_Name: "Picanto",
            Manufacturer: "Kia",
            Color: "Red",
            Model_Number: 2021,
            Engine_Type: "I4",
            Engine_Number: "ENG5678901234",
            Car_Type: "Hatchback",
            Mileage: 5000,
            Accidental: false,
            Price: 2800000,
            Availability: true
        },
        {
            Car_Name: "Jimny",
            Manufacturer: "Suzuki",
            Color: "Blue",
            Model_Number: 2020,
            Engine_Type: "I4",
            Engine_Number: "ENG6789012345",
            Car_Type: "SUV",
            Mileage: 20000,
            Accidental: false,
            Price: 3500000,
            Availability: true
        },
        {
            Car_Name: "Ertiga",
            Manufacturer: "Suzuki",
            Color: "Silver",
            Model_Number: 2021,
            Engine_Type: "I4",
            Engine_Number: "ENG7890123456",
            Car_Type: "Van",
            Mileage: 10000,
            Accidental: false,
            Price: 3200000,
            Availability: true
        },
        {
            Car_Name: "Prius",
            Manufacturer: "Toyota",
            Color: "Green",
            Model_Number: 2019,
            Engine_Type: "Hybrid",
            Engine_Number: "ENG8901234567",
            Car_Type: "Sedan",
            Mileage: 30000,
            Accidental: false,
            Price: 4500000,
            Availability: true
        },
        {
            Car_Name: "Jazz",
            Manufacturer: "Honda",
            Color: "Yellow",
            Model_Number: 2020,
            Engine_Type: "I3",
            Engine_Number: "ENG9012345678",
            Car_Type: "Hatchback",
            Mileage: 15000,
            Accidental: false,
            Price: 2100000,
            Availability: true
        },
        {
            Car_Name: "Wagon R",
            Manufacturer: "Suzuki",
            Color: "Brown",
            Model_Number: 2021,
            Engine_Type: "I4",
            Engine_Number: "ENG0123456789",
            Car_Type: "Mini",
            Mileage: 8000,
            Accidental: false,
            Price: 1900000,
            Availability: true
        }
        
    ])
    
}

addCar();