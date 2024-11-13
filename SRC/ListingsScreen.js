function ListingsScreen({ onBackClick, onSearchClick }) {
  const [listings, setListings] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('https://67177012b910c6a6e0282941.mockapi.io/api/content')
      .then((response) => response.json())
      .then((data) => {
        setListings(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch listings. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = listings.filter((item) => {
      const matchesCategory =
        category === 'All' ||
        item.category?.toLowerCase() === category.toLowerCase();

      const matchesSearch =
        !searchTerm ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setFilteredData(filtered);
  }, [searchTerm, category, listings]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <CircularProgress />
        <Typography marginTop={2}>Loading listings...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" flex={1}>
            Listings
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Search Box */}
      <Box padding={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Where do you want to stay?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                color="primary"
                onClick={() => onSearchClick({ searchTerm, category })}>
                Search
              </Button>
            ),
          }}
        />
      </Box>

      {/* Category Tabs */}
      <Tabs
        value={category}
        onChange={(e, newValue) => setCategory(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
        aria-label="Category Tabs">
        <Tab label="All" value="All" />
        <Tab label="Beach" value="Beach" />
        <Tab label="Mountain" value="Mountain" />
        <Tab label="Camping" value="Camping" />
      </Tabs>

      {/* Listings */}
      <Box padding={2}>
        {filteredData.length > 0 ? (
          filteredData.map((listing) => (
            <Card key={listing.id} sx={{ marginBottom: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={listing.img || 'https://via.placeholder.com/400x300'}
                alt={listing.name || 'No Name'}
              />
              <CardContent>
                <Typography variant="h6">
                  {listing.name || 'No Name'}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {listing.price || 'No Price'}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box textAlign="center" marginTop={4}>
            <img
              src="https://via.placeholder.com/200x150"
              alt="No results found"
              style={{ marginBottom: 16 }}
            />
            <Typography variant="body1">No results found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}