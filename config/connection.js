// config/connection.js
const dotenv = require("dotenv");

dotenv.config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL;

mongoose.connect(uri, {});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const LoginSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
});

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("collection1", LoginSchema);
const AdminCollection = new mongoose.model("AdminData", AdminSchema);
module.exports = { mongoose, db, collection, AdminCollection };
