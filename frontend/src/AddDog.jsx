import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AddDog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    image: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.breed || !form.age) {
      return setError("Name, breed and age are required");
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/dogs`,
        { ...form, age: Number(form.age), weight: Number(form.weight) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dogs");
    } catch {
      setError("Failed to add dog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Name" },
    { name: "breed", label: "Breed" },
    { name: "age", label: "Age (years)", type: "number" },
    { name: "weight", label: "Weight (kg)", type: "number" },
    { name: "color", label: "Color" },
    { name: "image", label: "Image URL" },
    { name: "title", label: "Title" },
  ];

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Add a Dog</Typography>

      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {fields.map((f) => (
          <TextField
            key={f.name}
            name={f.name}
            label={f.label}
            type={f.type || "text"}
            value={form[f.name]}
            onChange={handleChange}
          />
        ))}

        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Adding..." : "Add Dog"}
        </Button>

        <Button onClick={() => navigate("/dogs")}>Cancel</Button>
      </Box>
    </Box>
  );
}