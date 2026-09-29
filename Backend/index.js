const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const flash = require('connect-flash');


//Routes Calling
const exploreRoute = require("./routes/explore.js")
const carRoute = require("./routes/car.js")
const employeeRoute = require("./routes/employee.js")
const customerRoute = require("./routes/customer.js")
const saleRoute = require("./routes/sale.js")
const historyRoute = require("./routes/history.js")
const authenticateRoute = require("./routes/authenticate.js")
const personalPostsRoute = require("./routes/personalPosts.js")
const cloudDatabaseURL = process.env.ATLASDB_URL;

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));         
app.use(cookieParser()); 
// app.use((req, res, next) => {
//     console.log("req", req.cookies);
//     next();
// });


const allowedOrigins = [
    'https://autonexus-nu.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
}));

//connection with mongooDB
async function Main() {
    // await mongoose.connect("mongodb://127.0.0.1:27017/Car_Dealership");
    await mongoose.connect(cloudDatabaseURL);
}
Main().then(()=>{console.log("Database connected...")}).catch((err)=>{console.log(err)});

// Health check & Keep-alive endpoint (pings MongoDB)
app.get("/", (req, res) => {
    res.redirect("/health");
});

app.get("/health", async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
        
        let dbPing = "not_connected";
        if (dbState === 1 && mongoose.connection.db) {
            await mongoose.connection.db.admin().ping();
            dbPing = "ok";
        }

        res.status(200).json({
            status: "active",
            message: "AutoNexus backend is awake",
            database: {
                status: states[dbState] || "unknown",
                ping: dbPing
            },
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error("Health check error:", err.message);
        res.status(500).json({
            status: "error",
            error: err.message,
            timestamp: new Date().toISOString()
        });
    }
});

//Routes
app.use("/explore" , exploreRoute);
app.use("/car" , carRoute);
app.use("/aboutus" , employeeRoute);
app.use("/customer" , customerRoute);
app.use("/addsales" , saleRoute);
app.use("/history" , historyRoute);
app.use("/authenticate" , authenticateRoute);
app.use("/personalPosts" , personalPostsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}....`);

    // Automatic self-ping on Render (Render automatically sets RENDER_EXTERNAL_URL)
    const backendUrl = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
    if (backendUrl) {
        const client = backendUrl.startsWith("https") ? require("https") : require("http");
        const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
        setInterval(() => {
            client.get(`${backendUrl}/health`, (resp) => {
                console.log(`[Keep-Alive] Pinged ${backendUrl}/health -> Status: ${resp.statusCode}`);
            }).on("error", (err) => {
                console.error(`[Keep-Alive] Ping failed:`, err.message);
            });
        }, PING_INTERVAL);
        console.log(`[Keep-Alive] Self-ping scheduled every 14 minutes for ${backendUrl}`);
    }
});