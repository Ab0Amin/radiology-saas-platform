'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

export default function LoginPage() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // In a real application, this would make an API call to authenticate
    try {
      if (role === 'patient') {
        // Patient login logic (mobile + DOB)
        if (!mobile || !dob) {
          throw new Error('Please enter both mobile number and date of birth');
        }
        
        // Mock API call
        console.log('Patient login with:', { mobile, dob });
      } else {
        // Staff login logic (username + password)
        if (!username || !password) {
          throw new Error('Please enter both username and password');
        }
        
        // Mock API call
        console.log('Staff login with:', { username, password, role });
      }
      
      // Redirect to dashboard on success (in a real app)
      // router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="role-select-label">Login As</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Login As"
              onChange={handleRoleChange}
              required
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="receptionist">Receptionist</MenuItem>
              <MenuItem value="technician">Technician</MenuItem>
              <MenuItem value="radiologist">Radiologist</MenuItem>
              <MenuItem value="admin">Administrator</MenuItem>
            </Select>
          </FormControl>
          
          {role === 'patient' ? (
            // Patient login form (mobile + DOB)
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          ) : (
            // Staff login form (username + password)
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!role}
          >
            Login
          </Button>
        </Box>
      </Paper>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}