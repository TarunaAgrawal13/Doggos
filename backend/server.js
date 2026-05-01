const express = require('express');
const cors = require('cors');
const connectDB = require("./init/db");
const Dog = require("./models/Dog");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/aiRoutes");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);

// Connect DB
connectDB();

// =======================
// 🐕 CRUD ROUTES
// =======================

// GET all dogs
app.get("/dogs", async (req, res) => {
  const dogs = await Dog.find();
  res.json(dogs);
});

// CREATE dog
app.post("/dogs", authMiddleware, async (req, res) => {
  try {
    const dog = new Dog({
      ...req.body,
      owner: req.user.userId
    });
    await dog.save();
    res.status(201).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single dog
app.get("/dogs/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE dog
app.put("/dogs/:id", authMiddleware, async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    if (dog.owner.toString() !== req.user.userId)
      return res.status(403).json({ message: "Not authorized" });

    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE dog
app.delete("/dogs/:id", authMiddleware, async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    if (dog.owner.toString() !== req.user.userId)
      return res.status(403).json({ message: "Not authorized" });

    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: "Dog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// 🚀 START SERVER
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});