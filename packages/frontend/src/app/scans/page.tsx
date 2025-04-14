'use client';

import React from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab } from '@mui/material';
import AppLayout from '../components/layout/AppLayout';
import DicomViewer from '../components/dicom/DicomViewer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scan-tabpanel-${index}`}
      aria-labelledby={`scan-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ScansPage() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <AppLayout title="DICOM Viewer">
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          DICOM Viewer
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ mb: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="scan tabs">
                  <Tab label="Viewer" />
                  <Tab label="Patient Info" />
                  <Tab label="Report" />
                </Tabs>
              </Box>
              
              <TabPanel value={tabValue} index={0}>
                <DicomViewer />
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>Patient Information</Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Name</Typography>
                      <Typography variant="body1" gutterBottom>John Doe</Typography>
                      
                      <Typography variant="subtitle2">Date of Birth</Typography>
                      <Typography variant="body1" gutterBottom>January 15, 1975</Typography>
                      
                      <Typography variant="subtitle2">Patient ID</Typography>
                      <Typography variant="body1" gutterBottom>P12345678</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Scan Type</Typography>
                      <Typography variant="body1" gutterBottom>MRI</Typography>
                      
                      <Typography variant="subtitle2">Body Part</Typography>
                      <Typography variant="body1" gutterBottom>Brain</Typography>
                      
                      <Typography variant="subtitle2">Scan Date</Typography>
                      <Typography variant="body1" gutterBottom>April 14, 2025</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>Radiologist Report</Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2">Findings</Typography>
                    <Typography variant="body1" paragraph>
                      No abnormal findings detected. The brain parenchyma demonstrates normal signal intensity throughout. 
                      No evidence of acute infarction, hemorrhage, or mass effect. The ventricles and sulci are normal in size and configuration for the patient's age.
                    </Typography>
                    
                    <Typography variant="subtitle2">Impression</Typography>
                    <Typography variant="body1" paragraph>
                      Normal MRI examination of the brain.
                    </Typography>
                    
                    <Typography variant="subtitle2">Recommendations</Typography>
                    <Typography variant="body1" paragraph>
                      No follow-up imaging is required at this time.
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2">Radiologist</Typography>
                    <Typography variant="body1">Dr. Jane Smith</Typography>
                    
                    <Typography variant="subtitle2">Report Date</Typography>
                    <Typography variant="body1">April 14, 2025</Typography>
                  </Box>
                </Paper>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
}