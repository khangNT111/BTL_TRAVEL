function SearchDate({ onClose, onNext }) {
  const [dateOption, setDateOption] = useState('choose');
  const [days, setDays] = useState(1);

  const handleDateOptionChange = (event, newOption) => {
    if (newOption !== null) {
      setDateOption(newOption);
      
      function SearchScreen({ onClose, onSearch }) {
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
              {/* Title */}
              <Typography variant="h5" gutterBottom>
                Where to?
              </Typography>

              {/* Search Input */}
              <TextField
                fullWidth
                placeholder="Search"
                variant="outlined"
                InputProps={{
                  startAdornment: <span>🔍</span>,
                }}
                margin="normal"
              />

              {/* Suggestion Options */}
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

              {/* Divider and Fields */}
              <Box marginY={2}>
                <Divider />
                <Box display="flex" justifyContent="space-between" paddingY={2}>
                  <Typography variant="body1">When</Typography>
                  <Button variant="text">Add time</Button>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" paddingY={2}>
                  <Typography variant="body1">Guests</Typography>
                  <Button variant="text">Add guests</Button>
                </Box>
                <Divider />
              </Box>

              {/* Search Button */}
              <Box display="flex" justifyContent="center" marginTop={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onSearch('Selected Location')} // Replace 'Selected Location' dynamically as needed
                >
                  🔍 Search
                </Button>
              </Box>
            </Box>
          </Box>
        );
      }
    }
  };

  const handleDaysChange = (change) => {
    setDays((prevDays) => Math.max(1, prevDays + change));
  };

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
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: <span>Anywhere</span>,
          }}
        />
        <Typography variant="h6" gutterBottom>
          When staying
        </Typography>
        <ToggleButtonGroup
          value={dateOption}
          exclusive
          onChange={handleDateOptionChange}
          fullWidth>
          <ToggleButton value="choose">Choose dates</ToggleButton>
          <ToggleButton value="anytime">Anytime</ToggleButton>
        </ToggleButtonGroup>
        {dateOption === 'choose' && (
          <Box mt={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <IconButton>
                <ArrowBackIosIcon />
              </IconButton>
              <Typography variant="h6">November 2024</Typography>
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography variant="body2" color="textSecondary">
                Calendar placeholder for date selection
              </Typography>
            </Box>
          </Box>
        )}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <IconButton onClick={() => handleDaysChange(-1)}>-</IconButton>
          <Typography variant="body1" mx={2}>
            {days} {days === 1 ? 'day' : 'days'}
          </Typography>
          <IconButton onClick={() => handleDaysChange(1)}>+</IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onNext('23 - 25 November', days)}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}