import Dogcard from "./dogcard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import AddDog from "./AddDog";

export default function Alldogs() {
  const [dogs, setDogs] = useState([]);

useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/dogs`)
    .then((res) => {
      setDogs(res.data);
    })
    .catch((err) => console.log("ERROR:", err));
}, []);

  return (
    <Grid container spacing={3}>
      {dogs?.map((dog) => (
        <Grid item xs={12} md={4} key={dog._id}>
          <Dogcard {...dog} />
        </Grid>
      ))}
    </Grid>
  );
}