'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  Grid,
  Slider,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  Straighten,
  Contrast,
  Rotate90DegreesCcw,
  Fullscreen,
  Save,
  Print
} from '@mui/icons-material';

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
      id={`dicom-tabpanel-${index}`}
      aria-labelledby={`dicom-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// This is a placeholder component for a real DICOM viewer
// In a real application, you would integrate with a library like Cornerstone.js or OHIF Viewer
export default function DicomViewer() {
  const [tabValue, setTabValue] = useState(0);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [zoom, setZoom] = useState(100);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBrightnessChange = (event: Event, newValue: number | number[]) => {
    setBrightness(newValue as number);
  };

  const handleContrastChange = (event: Event, newValue: number | number[]) => {
    setContrast(newValue as number);
  };

  const handleZoomChange = (event: Event, newValue: number | number[]) => {
    setZoom(newValue as number);
  };

  return (
    <Paper elevation={3} sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="DICOM view tabs">
          <Tab label="Axial" />
          <Tab label="Sagittal" />
          <Tab label="Coronal" />
          <Tab label="3D View" />
        </Tabs>
      </Box>
      
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Left sidebar with tools */}
        <Box sx={{ width: '60px', borderRight: 1, borderColor: 'divider', p: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Tooltip title="Zoom In">
              <IconButton onClick={() => setZoom(prev => Math.min(prev + 10, 200))}>
                <ZoomIn />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
              <IconButton onClick={() => setZoom(prev => Math.max(prev - 10, 50))}>
                <ZoomOut />
              </IconButton>
            </Tooltip>
            <Tooltip title="Measure">
              <IconButton>
                <Straighten />
              </IconButton>
            </Tooltip>
            <Tooltip title="Adjust Contrast">
              <IconButton>
                <Contrast />
              </IconButton>
            </Tooltip>
            <Tooltip title="Rotate">
              <IconButton>
                <Rotate90DegreesCcw />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fullscreen">
              <IconButton>
                <Fullscreen />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton>
                <Save />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton>
                <Print />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Main content area */}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <TabPanel value={tabValue} index={0}>
            <Box 
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Typography variant="h6" color="white">
                Axial View - Placeholder
              </Typography>
              {/* This would be replaced with actual DICOM rendering */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  left: 10, 
                  color: 'white',
                  fontSize: '0.8rem'
                }}
              >
                Zoom: {zoom}% | Brightness: {brightness} | Contrast: {contrast}
              </Box>
            </Box>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Box 
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Typography variant="h6" color="white">
                Sagittal View - Placeholder
              </Typography>
            </Box>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Box 
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Typography variant="h6" color="white">
                Coronal View - Placeholder
              </Typography>
            </Box>
          </TabPanel>
          
          <TabPanel value={tabValue} index={3}>
            <Box 
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Typography variant="h6" color="white">
                3D Reconstruction - Placeholder
              </Typography>
            </Box>
          </TabPanel>
        </Box>
        
        {/* Right sidebar with adjustments */}
        <Box sx={{ width: '200px', borderLeft: 1, borderColor: 'divider', p: 2 }}>
          <Typography gutterBottom>Brightness</Typography>
          <Slider
            value={brightness}
            onChange={handleBrightnessChange}
            aria-labelledby="brightness-slider"
            min={0}
            max={100}
          />
          
          <Typography gutterBottom sx={{ mt: 2 }}>Contrast</Typography>
          <Slider
            value={contrast}
            onChange={handleContrastChange}
            aria-labelledby="contrast-slider"
            min={0}
            max={100}
          />
          
          <Typography gutterBottom sx={{ mt: 2 }}>Zoom</Typography>
          <Slider
            value={zoom}
            onChange={handleZoomChange}
            aria-labelledby="zoom-slider"
            min={50}
            max={200}
          />
          
          <Box sx={{ mt: 4 }}>
            <Typography gutterBottom>Slice Navigation</Typography>
            <ButtonGroup variant="outlined" fullWidth>
              <Button>Prev</Button>
              <Button>Next</Button>
            </ButtonGroup>
            <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
              Slice: 24 / 48
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}