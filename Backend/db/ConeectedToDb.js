const mongoose = require("mongoose");
const ConnectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("Error Connecting to MongoDB", error);
    process.exit(1);
  }
};
module.exports = ConnectToDb;
