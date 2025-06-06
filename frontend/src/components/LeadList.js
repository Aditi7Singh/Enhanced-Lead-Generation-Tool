import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
} from '@mui/material';
import axios from 'axios';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('http://localhost:8000/leads');
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((lead) => (
                  <TableRow
                    hover
                    key={lead.id}
                    onClick={() => navigate(`/leads/${lead.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{lead.company_name}</TableCell>
                    <TableCell>{lead.website}</TableCell>
                    <TableCell>{lead.industry}</TableCell>
                    <TableCell>{lead.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${lead.score}%`}
                        color={getScoreColor(lead.score)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={leads.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default LeadList; 