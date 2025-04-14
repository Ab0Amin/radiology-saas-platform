'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import AppLayout from '../components/layout/AppLayout';

// Mock data for patients
const mockPatients = [
  { id: 1, name: 'John Doe', dob: '1975-01-15', mobile: '555-123-4567', email: 'john.doe@example.com', lastVisit: '2025-04-10' },
  { id: 2, name: 'Jane Smith', dob: '1982-05-22', mobile: '555-987-6543', email: 'jane.smith@example.com', lastVisit: '2025-04-12' },
  { id: 3, name: 'Robert Johnson', dob: '1968-11-03', mobile: '555-456-7890', email: 'robert.j@example.com', lastVisit: '2025-04-13' },
  { id: 4, name: 'Sarah Williams', dob: '1990-08-17', mobile: '555-789-0123', email: 'sarah.w@example.com', lastVisit: '2025-04-14' },
  { id: 5, name: 'Michael Brown', dob: '1955-03-30', mobile: '555-321-6547', email: 'michael.b@example.com', lastVisit: '2025-04-08' },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    dob: '',
    mobile: '',
    email: '',
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mobile.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPatient({
      name: '',
      dob: '',
      mobile: '',
      email: '',
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPatient = () => {
    const newId = Math.max(...patients.map(p => p.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    setPatients(prev => [
      ...prev,
      {
        id: newId,
        ...newPatient,
        lastVisit: today
      }
    ]);
    
    handleCloseDialog();
  };

  return (
    <AppLayout title="Patients">
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Patients
          </Typography>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Add Patient
          </Button>
        </Box>
        
        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search patients by name, mobile, or email..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="patients table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Last Visit</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell component="th" scope="row">
                    {patient.name}
                  </TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.mobile}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <ViewIcon />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPatients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No patients found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Add Patient Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Please enter the patient's information below.
            </DialogContentText>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="name"
                  name="name"
                  label="Full Name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  value={newPatient.dob}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  label="Mobile Number"
                  value={newPatient.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={newPatient.email}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleAddPatient}
              variant="contained"
              disabled={!newPatient.name || !newPatient.dob || !newPatient.mobile}
            >
              Add Patient
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppLayout>
  );
}