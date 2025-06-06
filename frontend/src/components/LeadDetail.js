import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/leads/${id}`);
        setLead(response.data);
      } catch (error) {
        console.error('Error fetching lead:', error);
      }
    };

    fetchLead();
  }, [id]);

  if (!lead) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/leads')}
        sx={{ mb: 2 }}
      >
        Back to Leads
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">{lead.company_name}</Typography>
          <Chip
            label={`Score: ${lead.score}%`}
            color={getScoreColor(lead.score)}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Website
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <a href={lead.website} target="_blank" rel="noopener noreferrer">
                {lead.website}
              </a>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              Industry
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {lead.industry || 'N/A'}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {lead.location || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Employee Count
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {lead.employee_count || 'N/A'}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              Contact Email
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {lead.contact_email || 'N/A'}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              Last Updated
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {new Date(lead.updated_at).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LeadDetail; 