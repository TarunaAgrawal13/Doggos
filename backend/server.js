const express = require('express');
const cors = require('cors');
const dogs = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/dogs", (req, res) => {
  res.json(dogs);
});


app.get("/dogs/:id", (req, res) => {
  const dog = dogs.find(d => d.id == req.params.id);
  if (!dog) return res.status(404).json({ message: "Dog not found" });
  res.json(dog);
});


app.listen(3000,()=>{
 console.log("Server Listening on port 3000");
})