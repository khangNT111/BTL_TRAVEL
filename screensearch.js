import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function SearchScreen({ onClose, onSearchClick }) {
  return (
    <Box>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <IconButton edge="start" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box padding={3}>
        <Typography variant="h5" gutterBottom>
          Where to?
        </Typography>
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          InputProps={{
            startAdornment: <span>🔍</span>,
          }}
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" marginY={3}>
          {[
            {
              title: 'Anywhere',
              img: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/73fd308a41f26a5eb99298b2ee71a038',
            },
            {
              title: 'Europe',
              img: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/dfe04dadb3e1ee6f7d95fab72a2c150a',
            },
            {
              title: 'Asia',
              img: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/aba07a75ba9345537add57d65f2fce84',
            },
          ].map((item, index) => (
            <Card key={index} sx={{ width: '30%' }}>
              <CardMedia
                component="img"
                height="100"
                image={item.img}
                alt={item.title}
              />
              <CardContent sx={{ textAlign: 'center', padding: '8px' }}>
                <Typography variant="body2">{item.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box marginY={2}>
          <Divider />
          <Box display="flex" justifyContent="space-between" paddingY={2}>
            <Typography variant="body1">When</Typography>
            <Button variant="text" onClick={onSearchClick}>
              Add time
            </Button>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" paddingY={2}>
            <Typography variant="body1">Guests</Typography>
            <Button variant="text">Add guests</Button>
          </Box>
          <Divider />
        </Box>
        <Box display="flex" justifyContent="space-between" marginTop={3}>
          <Button color="primary">Clear all</Button>
          <Button variant="contained" color="primary" onClick={onSearchClick}>
            🔍 Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchScreen;  
