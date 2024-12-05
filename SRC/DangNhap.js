import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { Apple as AppleIcon, Facebook as FacebookIcon, Google as GoogleIcon } from '@mui/icons-material';

function SignupScreen({ onContinueClick }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(false);

  const handleContinueClick = () => {
    if (mobileNumber.trim() === '') {
      setError(true);
      return;
    }
    setError(false);
    onContinueClick();
  };
  return (
    <Box padding={3} textAlign="left">
      <Typography variant="h5" gutterBottom>
        Create an account
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        Enter your mobile number:
      </Typography>
      <TextField
        variant="outlined"
        placeholder="+1 Mobile number"
        fullWidth
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        error={error}
        helperText={error ? 'Please enter your mobile number' : ''}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleContinueClick}
      >
        Continue
      </Button>
      <Divider sx={{ marginY: 2 }}>or</Divider>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<AppleIcon />}
      >
        Continue with Apple
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        startIcon={<FacebookIcon />}
      >
        Continue with Facebook
      </Button>
      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<GoogleIcon />}
      >
        Continue with Google
      </Button>
      <Typography variant="caption" display="block" marginTop={2}>
        By signing up, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </Typography>
    </Box>
  );
}
export default SignupScreen;
