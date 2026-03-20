import './Dogcard.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Dogcard({ _id, name, image, title }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "62vh" }} className='cd'>
      <CardMedia
        sx={{ height: 300 }}
        image={image}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </CardContent>

      <CardActions>
        <Button 
          size="small"
          onClick={() => navigate(`/dogs/${_id}`)}
        >
          See More
        </Button>
      </CardActions>
    </Card>
  );
}