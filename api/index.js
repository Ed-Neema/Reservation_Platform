const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const cookieParser = require("cookie-parser");

const app = express();


const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
     const errorMessage = err.message || "Something went wrong!";
     return res.status(errorStatus).json({
       success: false,
       status: errorStatus,
       message: errorMessage,
       stack: err.stack,
     });
})
connectDB();
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})