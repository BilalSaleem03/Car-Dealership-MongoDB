CREATE TABLE Car (
    Car_Id VARCHAR(50) PRIMARY KEY,
    Car_Name VARCHAR(20) NOT NULL,
    Manufacturer VARCHAR(20) NOT NULL,
    Colour VARCHAR(20) NOT NULL,
    Engine_Type VARCHAR(20) NOT NULL,
    Engine_Number VARCHAR(30) NOT NULL,
    Car_Type VARCHAR(20) NOT NULL,
    Mileage BIGINT UNSIGNED NOT NULL,
    Price BIGINT UNSIGNED NOT NULL,
    Availability BOOLEAN DEFAULT TRUE
);

CREATE TABLE Customer (
    Customer_id VARCHAR(50) PRIMARY KEY,
    First_Name VARCHAR(20) NOT NULL,
    Last_Name VARCHAR(20) NOT NULL,
    CNIC BIGINT UNSIGNED UNIQUE,
    Gender VARCHAR(20),
    Date_of_Birth DATE,
    Email_Address VARCHAR(100) UNIQUE NOT NULL,
    Phone_Number VARCHAR(15) NOT NULL, 
    Telephone VARCHAR(15),
    Address VARCHAR(200)
);

CREATE TABLE Salesperson (
    Salesperson_id VARCHAR(50) PRIMARY KEY,                      -- Primary key for unique identification
    First_Name VARCHAR(20) NOT NULL,                             -- First name, cannot be null
    Last_Name VARCHAR(20) NOT NULL,                              -- Last name, cannot be null
    CNIC BIGINT UNSIGNED NOT NULL UNIQUE,                        -- CNIC (national ID), cannot be null and must be unique
    Gender VARCHAR(20),                                          -- Gender
    Date_of_Birth DATE NOT NULL,                                 -- Date of birth, cannot be null
    Email_Address VARCHAR(100) UNIQUE NOT NULL,                  -- Email address, must be unique and cannot be null
    Phone_Number VARCHAR(15),                                    -- Phone number
    Telephone VARCHAR(15),                                       -- Telephone number
    Address VARCHAR(200) NOT NULL,                               -- Address, cannot be null
    Hire_Date DATE NOT NULL,                                     -- Hire date, cannot be null
    Salary BIGINT UNSIGNED NOT NULL,                             -- Salary, cannot be null
    Commission_Rate INT CHECK (Commission_Rate >= 0 AND Commission_Rate <= 100) -- Commission rate, must be between 0 and 100
);

CREATE TABLE Sales (
    Sale_id VARCHAR(50) PRIMARY KEY,                   -- Primary key for unique identification of each sale
    Car_id VARCHAR(50),                                -- Foreign key referencing Car table
    Customer_id VARCHAR(50),                           -- Foreign key referencing Customer table
    Salesperson_id VARCHAR(50),                        -- Foreign key referencing Salesperson table
    Sale_Date DATE NOT NULL,                           -- Date of the sale, cannot be null
    Asked_Amount BIGINT NOT NULL CHECK (Asked_Amount > 0),  -- The amount asked for the car, must be greater than 0
    Given_Amount BIGINT NOT NULL CHECK (Given_Amount > 0),  -- The amount actually given, must be greater than 0
    Payment_Method VARCHAR(20) NOT NULL,               -- Payment method used, cannot be null
    FOREIGN KEY (Car_id) REFERENCES Car(Car_Id),       -- Foreign key constraint linking to Car table
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id), -- Foreign key constraint linking to Customer table
    FOREIGN KEY (Salesperson_id) REFERENCES Salesperson(Salesperson_id) -- Foreign key constraint linking to Salesperson table
);