import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function EditDog() {
  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dogs/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => setError("Failed to load dog data"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/dogs/${id}`,
        { ...form, age: Number(form.age), weight: Number(form.weight) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/dogs/${id}`);
    } catch {
      setError("Failed to update. You may not be the owner.");
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
      <Typography variant="h4" sx={{ mb: 3 }}>Edit Dog</Typography>

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
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        <Button onClick={() => navigate(`/dogs/${id}`)}>Cancel</Button>
      </Box>
    </Box>
  );
}