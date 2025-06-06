import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [stats, setStats] = useState({
    totalLeads: 0,
    highQualityLeads: 0,
    averageScore: 0,
  });

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const handleScrape = async () => {
    try {
      await axios.post('http://localhost:8000/scrape', { url });
      setUrl('');
      // Refresh stats after scraping
      const response = await axios.get('http://localhost:8000/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error scraping URL:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Leads
            </Typography>
            <Typography component="p" variant="h4">
              {stats.totalLeads}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              High Quality Leads
            </Typography>
            <Typography component="p" variant="h4">
              {stats.highQualityLeads}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Average Lead Score
            </Typography>
            <Typography component="p" variant="h4">
              {stats.averageScore.toFixed(1)}
            </Typography>
          </Paper>
        </Grid>

        {/* Scraping Form */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Scrape New Lead
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Company Website URL"
                variant="outlined"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleScrape}
                disabled={!url}
              >
                Scrape
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 