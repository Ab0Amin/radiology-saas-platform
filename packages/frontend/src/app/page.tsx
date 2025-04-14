import { Box, Button, Container, Typography, Paper, Grid } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Radiology SaaS Platform
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          A comprehensive solution for radiology centers and hospitals
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                For Receptionists
              </Typography>
              <Typography variant="body1" paragraph>
                Easily manage patient records, schedule appointments, and track scan requests.
              </Typography>
              <Button variant="outlined" component={Link} href="/login">
                Login as Receptionist
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                For Radiologists
              </Typography>
              <Typography variant="body1" paragraph>
                View DICOM scans in 3D, use measuring tools, and write detailed reports.
              </Typography>
              <Button variant="outlined" component={Link} href="/login">
                Login as Radiologist
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                For Administrators
              </Typography>
              <Typography variant="body1" paragraph>
                Manage users, view analytics, and configure your radiology center settings.
              </Typography>
              <Button variant="outlined" component={Link} href="/login">
                Login as Admin
              </Button>
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Register Your Radiology Center
          </Typography>
          <Typography variant="body1" paragraph>
            Join our platform and get access to state-of-the-art radiology tools.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            href="/register"
            sx={{ mt: 2 }}
          >
            Register Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
}