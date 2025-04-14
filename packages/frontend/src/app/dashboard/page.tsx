'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import AppLayout from '../components/layout/AppLayout';

// Mock data for the dashboard
const recentPatients = [
  { id: 1, name: 'John Doe', age: 45, scanType: 'MRI', date: '2025-04-12' },
  { id: 2, name: 'Jane Smith', age: 32, scanType: 'CT Scan', date: '2025-04-13' },
  { id: 3, name: 'Robert Johnson', age: 58, scanType: 'X-Ray', date: '2025-04-14' },
];

const upcomingScans = [
  { id: 1, patientName: 'Alice Brown', scanType: 'MRI', bodyPart: 'Brain', date: '2025-04-15', time: '10:00 AM' },
  { id: 2, patientName: 'Michael Wilson', scanType: 'CT Scan', bodyPart: 'Chest', date: '2025-04-15', time: '11:30 AM' },
  { id: 3, patientName: 'Sarah Davis', scanType: 'X-Ray', bodyPart: 'Knee', date: '2025-04-16', time: '09:15 AM' },
];

const stats = {
  totalPatients: 1245,
  scansToday: 18,
  pendingReports: 7,
  completedScans: 42,
};

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard">
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Total Patients</Typography>
              <Typography variant="h3">{stats.totalPatients}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Scans Today</Typography>
              <Typography variant="h3">{stats.scansToday}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Pending Reports</Typography>
              <Typography variant="h3">{stats.pendingReports}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Completed Scans</Typography>
              <Typography variant="h3">{stats.completedScans}</Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Recent Patients and Upcoming Scans */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Recent Patients" />
              <CardContent>
                <List>
                  {recentPatients.map((patient) => (
                    <React.Fragment key={patient.id}>
                      <ListItem>
                        <ListItemText
                          primary={patient.name}
                          secondary={`${patient.age} years old • ${patient.scanType} • ${patient.date}`}
                        />
                      </ListItem>
                      {patient.id !== recentPatients.length && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Upcoming Scans" />
              <CardContent>
                <List>
                  {upcomingScans.map((scan) => (
                    <React.Fragment key={scan.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${scan.patientName} - ${scan.scanType}`}
                          secondary={`${scan.bodyPart} • ${scan.date} • ${scan.time}`}
                        />
                      </ListItem>
                      {scan.id !== upcomingScans.length && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
}