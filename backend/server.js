const express = require('express');
const cors = require('cors');
const connectDB = require("./init/db");
const Dog = require("./models/Dog");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

connectDB();   // connect database

app.get("/dogs", async(req, res) => {
  const dogs = await Dog.find();
  res.json(dogs);
});


app.post("/dogs",authMiddleware, async(req, res) => {
  // const newDog = {
  //   id: Date.now().toString(),
  //   name: req.body.name,
  //   image: req.body.image,
  //   title: req.body.title,
  //   breed: req.body.breed,
  //   age: req.body.age,
  //   weight: req.body.weight,
  //   color: req.body.color,
  //   description: req.body.description
  // };

  // dogs.push(newDog);

  // res.status(201).json(newDog);

  //  const newDog = new Dog(req.body);
  //  await newDog.save();
  //  res.status(201).json(newDog);



  try {

    const dog = new Dog({
      ...req.body,
      owner: req.user.userId
    });

    await dog.save();

    res.status(201).json(dog);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


app.get("/dogs/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    }

    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// app.put("/dogs/:id", async (req, res) => {
//   try {
//     const updatedDog = await Dog.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updatedDog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


app.put("/dogs/:id", authMiddleware, async (req, res) => {

  try {

    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({
        message: "Dog not found"
      });
    }

    if (dog.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedDog);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



// app.delete("/dogs/:id", async (req, res) => {
//   try {
//     await Dog.findByIdAndDelete(req.params.id);
//     res.json({ message: "Dog deleted successfully 🐶" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


app.delete("/dogs/:id", authMiddleware, async (req, res) => {

  try {

    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({
        message: "Dog not found"
      });
    }

    if (dog.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await Dog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Dog deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});





app.listen(3000,()=>{
 console.log("Server Listening on port 3000");
})