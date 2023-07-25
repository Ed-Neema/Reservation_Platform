const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(
      "DB Connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
module.exports = connectDB;