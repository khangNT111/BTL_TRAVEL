import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function GuestSelectionScreen({ onClose, onContinue }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleIncrease = (setter) => setter((prev) => prev + 1);
  const handleDecrease = (setter) =>
    setter((prev) => (prev > 0 ? prev - 1 : 0));

  const handleContinueClick = () => {
    const guestData = { adults, children, infants };
    onContinue(guestData);  
  };

  return (
    <Box padding={3}>
      <Typography variant="h5" gutterBottom>
        HOW MANY GUESTS
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {[{ label: 'Adults', value: adults, setter: setAdults },
        { label: 'Children', value: children, setter: setChildren }].map(
        ({ label, value, setter }) => (
          <Box
            key={label}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}>
            <Typography variant="body1">{label}</Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => handleDecrease(setter)}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ width: 30, textAlign: 'center' }}>
                {value}
              </Typography>
              <IconButton onClick={() => handleIncrease(setter)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        )
      )}
      <Divider sx={{ marginY: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Button color="primary" onClick={onClose}>
          Clear all 
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinueClick}>
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default GuestSelectionScreen;
