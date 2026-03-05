const { v4: uuidv4 } = require("uuid");

const dogs = [
  {
    id: uuidv4(),
    name: "Storm",
    image:
      "https://plus.unsplash.com/premium_photo-1667729435876-3a83af97f536?w=600&auto=format&fit=crop&q=60",
    title: "Snow angel with blue eyes (Husky)",
  },
  {
    id: uuidv4(),
    name: "Rocky",
    image:
      "https://plus.unsplash.com/premium_photo-1661962850828-0ebd5c3be7b1?w=600&auto=format&fit=crop&q=60",
    title: "King of courage (German Shepherd)",
  },
  {
    id: uuidv4(),
    name: "Luna",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=60",
    title: "Fluffy cloud full of energy (Samoyed)",
  },
  {
    id: uuidv4(),
    name: "Daisy",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&auto=format&fit=crop&q=60",
    title: "Tiny paws, huge personality (Chihuahua)",
  },
  {
    id: uuidv4(),
    name: "Milo",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&auto=format&fit=crop&q=60",
    title: "Gentle giant with a loving heart (Saint Bernard)",
  },
  {
    id: uuidv4(),
    name: "Simba",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=60",
    title: "Fearless protector and loyal guardian (Doberman)",
  },
  {
    id: uuidv4(),
    name: "Ruby",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=60",
    title: "Tiny diva with a big attitude (Yorkshire Terrier)",
  },
  {
    id: uuidv4(),
    name: "Shadow",
    image:
      "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?w=600&auto=format&fit=crop&q=60",
    title: "Agile runner full of intelligence (Border Collie)",
  },
  {
    id: uuidv4(),
    name: "Snowy",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=60",
    title: "White fluff ball full of charm (Bichon Frise)",
  },
  {
    id: uuidv4(),
    name: "Ace",
    image:
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=60",
    title: "Royal hunter with unstoppable energy (Beagle)",
  },
  {
    id: uuidv4(),
    name: "Zara",
    image:
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&auto=format&fit=crop&q=60",
    title: "Graceful athlete with a silky coat (Afghan Hound)",
  },
  {
    id: uuidv4(),
    name: "Bruno",
    image:
      "https://images.unsplash.com/photo-1541336187922-bffa4ef13d45?q=80&w=1170&auto=format&fit=crop",
    title: "Tiny face, Big Personality (Pug)",
  },
];

module.exports = dogs;