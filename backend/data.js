const { v4: uuidv4 } = require("uuid");

let dogs = [
  {
    id: uuidv4(),
    name: "Storm",
    breed: "Siberian Husky",
    age: "2 years",
    weight: "22 kg",
    color: "Black & White",
    image:
      "https://plus.unsplash.com/premium_photo-1667729435876-3a83af97f536?w=600&auto=format&fit=crop&q=60",
    title: "Snow angel with blue eyes (Husky)",
    description:
      "Storm is an energetic Husky who loves cold weather, running, and playing in the snow."
  },
  {
    id: uuidv4(),
    name: "Rocky",
    breed: "German Shepherd",
    age: "3 years",
    weight: "30 kg",
    color: "Black & Tan",
    image:
      "https://plus.unsplash.com/premium_photo-1661962850828-0ebd5c3be7b1?w=600&auto=format&fit=crop&q=60",
    title: "King of courage (German Shepherd)",
    description:
      "Rocky is a brave and loyal protector known for his intelligence and strong guarding instincts."
  },
  {
    id: uuidv4(),
    name: "Luna",
    breed: "Samoyed",
    age: "2 years",
    weight: "24 kg",
    color: "White",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=60",
    title: "Fluffy cloud full of energy (Samoyed)",
    description:
      "Luna is playful and affectionate, always smiling and spreading happiness wherever she goes."
  },
  {
    id: uuidv4(),
    name: "Daisy",
    breed: "Chihuahua",
    age: "1 year",
    weight: "3 kg",
    color: "Brown",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&auto=format&fit=crop&q=60",
    title: "Tiny paws, huge personality (Chihuahua)",
    description:
      "Daisy may be tiny but she has a huge personality and loves attention and cuddles."
  },
  {
    id: uuidv4(),
    name: "Milo",
    breed: "Saint Bernard",
    age: "4 years",
    weight: "65 kg",
    color: "Brown & White",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&auto=format&fit=crop&q=60",
    title: "Gentle giant with a loving heart (Saint Bernard)",
    description:
      "Milo is a calm and loving giant who enjoys relaxing with his family and helping people."
  },
  {
    id: uuidv4(),
    name: "Simba",
    breed: "Doberman",
    age: "3 years",
    weight: "34 kg",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=60",
    title: "Fearless protector and loyal guardian (Doberman)",
    description:
      "Simba is fearless, alert, and extremely loyal to his owners, making him a perfect guard dog."
  },
  {
    id: uuidv4(),
    name: "Ruby",
    breed: "Yorkshire Terrier",
    age: "2 years",
    weight: "4 kg",
    color: "Golden Brown",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=60",
    title: "Tiny diva with a big attitude (Yorkshire Terrier)",
    description:
      "Ruby is stylish and confident, always ready to show off her adorable personality."
  },
  {
    id: uuidv4(),
    name: "Shadow",
    breed: "Border Collie",
    age: "2.5 years",
    weight: "20 kg",
    color: "Black & White",
    image:
      "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?w=600&auto=format&fit=crop&q=60",
    title: "Agile runner full of intelligence (Border Collie)",
    description:
      "Shadow is extremely intelligent and loves learning tricks and running across open fields."
  },
  {
    id: uuidv4(),
    name: "Snowy",
    breed: "Bichon Frise",
    age: "1.5 years",
    weight: "6 kg",
    color: "White",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=60",
    title: "White fluff ball full of charm (Bichon Frise)",
    description:
      "Snowy is cheerful and friendly, known for her fluffy coat and playful nature."
  },
  {
    id: uuidv4(),
    name: "Ace",
    breed: "Beagle",
    age: "3 years",
    weight: "12 kg",
    color: "Tri-color",
    image:
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=60",
    title: "Royal hunter with unstoppable energy (Beagle)",
    description:
      "Ace loves adventures and sniffing around, always curious and full of enthusiasm."
  },
  {
    id: uuidv4(),
    name: "Zara",
    breed: "Afghan Hound",
    age: "4 years",
    weight: "25 kg",
    color: "Golden",
    image:
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&auto=format&fit=crop&q=60",
    title: "Graceful athlete with a silky coat (Afghan Hound)",
    description:
      "Zara is elegant and graceful with a beautiful silky coat and calm personality."
  },
  {
    id: uuidv4(),
    name: "Bruno",
    breed: "Pug",
    age: "2 years",
    weight: "8 kg",
    color: "Fawn",
    image:
      "https://images.unsplash.com/photo-1541336187922-bffa4ef13d45?q=80&w=1170&auto=format&fit=crop",
    title: "Tiny face, Big Personality (Pug)",
    description:
      "Bruno is playful, affectionate, and loves spending time with people."
  }
];

module.exports = dogs;