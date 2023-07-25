const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");

const app = express();


const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

connectDB();
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})