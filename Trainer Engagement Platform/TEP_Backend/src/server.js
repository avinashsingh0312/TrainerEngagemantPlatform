const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const companyRoutes = require("./routes/companyRoutes");
const adminRoutes = require("./routes/adminRoutes");

const PORT = process.env.PORT || 3001;

// Replace local MongoDB URI with MongoDB Atlas connection string
const uri = "mongodb+srv://avinash:avinash@cluster0.i3t3nph.mongodb.net";

const router = express();

// Middleware
router.use(cors());
router.use(express.json());

// Routes
router.use(authRoutes);
router.use(trainerRoutes);
router.use(companyRoutes);
router.use(adminRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "TrainerPlatform", // Make sure the dbName matches your Atlas database name
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Start the server
router.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
