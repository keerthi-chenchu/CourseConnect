const mongoose = require("mongoose")

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB Connected successfully...")
}

module.exports = connectDB