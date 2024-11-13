function SignupScreen({ onContinueClick }) {
  return (
    <Box padding={3} textAlign="left">
      <Typography variant="h5" gutterBottom>
        Create an account
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        Enter your mobile number:
      </Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          variant="outlined"
          placeholder="+1 Mobile number"
          fullWidth
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onContinueClick}>
        Continue
      </Button>
      <Divider sx={{ marginY: 2 }}>or</Divider>
      <Button variant="outlined" fullWidth startIcon={<span>🍏</span>}>
        Continue with Apple
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        startIcon={<span>📘</span>}>
        Continue with Facebook
      </Button>
      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<span>🔴</span>}>
        Continue with Google
      </Button>
      <Typography variant="caption" display="block" marginTop={2}>
        By signing up, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </Typography>
    </Box>
  );
}
