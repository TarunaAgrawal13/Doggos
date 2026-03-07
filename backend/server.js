const express = require('express');
const cors = require('cors');
let dogs = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/dogs", (req, res) => {
  res.json(dogs);
});


app.post("/dogs", (req, res) => {
  const newDog = {
    id: Date.now().toString(),
    name: req.body.name,
    image: req.body.image,
    title: req.body.title,
    breed: req.body.breed,
    age: req.body.age,
    weight: req.body.weight,
    color: req.body.color,
    description: req.body.description
  };

  dogs.push(newDog);

  res.status(201).json(newDog);
});


app.get("/dogs/:id", (req, res) => {
  const dog = dogs.find(d => d.id == req.params.id);
  if (!dog) return res.status(404).json({ message: "Dog not found" });
  res.json(dog);
});


app.put("/dogs/:id", (req, res) => {
  const id = req.params.id;

  const dogIndex = dogs.findIndex(dog => dog.id == id);

  if (dogIndex === -1) {
    return res.status(404).json({ message: "Dog not found" });
  }

  dogs[dogIndex] = {
    ...dogs[dogIndex],
    ...req.body
  };

  res.json({
    message: "Dog updated successfully",
    dog: dogs[dogIndex]
  });
});

app.delete("/dogs/:id", (req, res) => {
  const id = req.params.id;

  const index = dogs.findIndex(dog => dog.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Dog not found" });
  }

  const deletedDog = dogs.splice(index, 1);

  res.json({
    message: "Dog deleted successfully",
    dog: deletedDog
  });
});





app.listen(3000,()=>{
 console.log("Server Listening on port 3000");
})