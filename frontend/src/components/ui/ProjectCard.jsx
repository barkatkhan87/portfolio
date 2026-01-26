// src/components/sections/ProjectCard.jsx
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProjectCard = ({
  title,
  description,
  imageUrl,
  to,
  buttonLabel = 'View Details',
  bottomRight, // e.g. price
}) => (
  <Card className="card-hover">
    {imageUrl && (
      <CardMedia component="img" height="180" image={imageUrl} alt={title} />
    )}
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {description}
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: bottomRight ? 'space-between' : 'flex-start',
          alignItems: 'center',
        }}
      >
        {bottomRight && (
          <Typography sx={{ fontWeight: 800 }}>{bottomRight}</Typography>
        )}
        <Button component={Link} to={to} size="small">
          {buttonLabel}
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ProjectCard;