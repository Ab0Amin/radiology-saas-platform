'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Tooltip,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  Straighten,
  Contrast,
  Rotate90DegreesCcw,
  Fullscreen,
  Save,
  Print,
  PanTool,
  Timeline,
  Crop,
  ThreeDRotation,
  ViewInAr,
  Visibility
} from '@mui/icons-material';

// Import CSS for the component
import './DicomViewer.css';

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

// This is an enhanced DICOM viewer component
// In a production environment, this would be integrated with Cornerstone.js or similar library
export default function DicomViewer({ dicomUrl = '/sample-dicom.dcm' }) {
  const [tabValue, setTabValue] = useState(0);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [zoom, setZoom] = useState(100);
  const [sliceIndex, setSliceIndex] = useState(24);
  const [totalSlices, setTotalSlices] = useState(48);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('pan');
  const [viewMode, setViewMode] = useState<string>('single');
  const [measurementData, setMeasurementData] = useState<any[]>([]);
  
  // References to the viewer elements
  const axialViewRef = useRef<HTMLDivElement>(null);
  const sagittalViewRef = useRef<HTMLDivElement>(null);
  const coronalViewRef = useRef<HTMLDivElement>(null);
  const threeDViewRef = useRef<HTMLDivElement>(null);

  // Simulate loading DICOM data
  useEffect(() => {
    const loadDicomData = async () => {
      setLoading(true);
      // In a real implementation, this would load the DICOM file using cornerstone
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    };

    loadDicomData();
  }, [dicomUrl]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBrightnessChange = (event: Event, newValue: number | number[]) => {
    setBrightness(newValue as number);
    // In a real implementation, this would update the cornerstone viewport
  };

  const handleContrastChange = (event: Event, newValue: number | number[]) => {
    setContrast(newValue as number);
    // In a real implementation, this would update the cornerstone viewport
  };

  const handleZoomChange = (event: Event, newValue: number | number[]) => {
    setZoom(newValue as number);
    // In a real implementation, this would update the cornerstone viewport
  };

  const handlePreviousSlice = () => {
    if (sliceIndex > 0) {
      setSliceIndex(prev => prev - 1);
    }
  };

  const handleNextSlice = () => {
    if (sliceIndex < totalSlices - 1) {
      setSliceIndex(prev => prev + 1);
    }
  };

  const handleToolChange = (event: React.MouseEvent<HTMLElement>, newTool: string) => {
    if (newTool !== null) {
      setActiveTool(newTool);
      // In a real implementation, this would activate the corresponding cornerstone tool
    }
  };

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleAddMeasurement = () => {
    // In a real implementation, this would add a measurement to the cornerstone viewport
    const newMeasurement = {
      id: Date.now(),
      type: 'length',
      length: Math.round(Math.random() * 100) / 10,
      unit: 'cm',
      location: 'Axial view'
    };
    
    setMeasurementData(prev => [...prev, newMeasurement]);
  };

  const handleFullscreen = () => {
    // In a real implementation, this would make the viewer fullscreen
    const element = document.getElementById('dicom-viewer-container');
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
  };

  // Render the appropriate view based on the view mode
  const renderViews = () => {
    if (loading) {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          bgcolor: '#000'
        }}>
          <CircularProgress color="primary" />
          <Typography variant="h6" color="white" sx={{ ml: 2 }}>
            Loading DICOM data...
          </Typography>
        </Box>
      );
    }

    if (viewMode === 'quad') {
      return (
        <Grid container spacing={1} sx={{ height: '100%' }}>
          <Grid item xs={6} sx={{ height: '50%' }}>
            <Box 
              ref={axialViewRef}
              className="dicom-view"
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                backgroundImage: 'url(/axial-placeholder.jpg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <Typography variant="subtitle2" color="white" sx={{ position: 'absolute', top: 5, left: 10 }}>
                Axial View
              </Typography>
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 5, 
                  left: 5, 
                  color: 'white',
                  fontSize: '0.7rem',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  p: 0.5,
                  borderRadius: 1
                }}
              >
                Slice: {sliceIndex}/{totalSlices}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ height: '50%' }}>
            <Box 
              ref={sagittalViewRef}
              className="dicom-view"
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                backgroundImage: 'url(/sagittal-placeholder.jpg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <Typography variant="subtitle2" color="white" sx={{ position: 'absolute', top: 5, left: 10 }}>
                Sagittal View
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ height: '50%' }}>
            <Box 
              ref={coronalViewRef}
              className="dicom-view"
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                backgroundImage: 'url(/coronal-placeholder.jpg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <Typography variant="subtitle2" color="white" sx={{ position: 'absolute', top: 5, left: 10 }}>
                Coronal View
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ height: '50%' }}>
            <Box 
              ref={threeDViewRef}
              className="dicom-view"
              sx={{ 
                height: '100%', 
                bgcolor: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                backgroundImage: 'url(/3d-placeholder.jpg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <Typography variant="subtitle2" color="white" sx={{ position: 'absolute', top: 5, left: 10 }}>
                3D View
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    }

    return (
      <TabPanel value={tabValue} index={0}>
        <Box 
          ref={axialViewRef}
          className="dicom-view"
          sx={{ 
            height: '100%', 
            bgcolor: 'black', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            backgroundImage: 'url(/axial-placeholder.jpg)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {activeTool === 'measure' && (
            <Box 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '30%', 
                right: '30%', 
                height: '2px', 
                bgcolor: 'yellow',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-4px',
                  left: 0,
                  width: '8px',
                  height: '8px',
                  bgcolor: 'yellow',
                  borderRadius: '50%'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '-4px',
                  right: 0,
                  width: '8px',
                  height: '8px',
                  bgcolor: 'yellow',
                  borderRadius: '50%'
                }
              }}
            />
          )}
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 10, 
              left: 10, 
              color: 'white',
              fontSize: '0.8rem',
              bgcolor: 'rgba(0,0,0,0.5)',
              p: 1,
              borderRadius: 1
            }}
          >
            Zoom: {zoom}% | Brightness: {brightness} | Contrast: {contrast} | Slice: {sliceIndex}/{totalSlices}
          </Box>
        </Box>
      </TabPanel>
    );
  };

  return (
    <Paper elevation={3} sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }} id="dicom-viewer-container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="DICOM view tabs">
          <Tab label="Axial" />
          <Tab label="Sagittal" />
          <Tab label="Coronal" />
          <Tab label="3D View" />
        </Tabs>
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          aria-label="view mode"
          size="small"
          sx={{ mr: 2 }}
        >
          <ToggleButton value="single" aria-label="single view">
            <Visibility />
          </ToggleButton>
          <ToggleButton value="quad" aria-label="quad view">
            <ViewInAr />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Left sidebar with tools */}
        <Box sx={{ width: '60px', borderRight: 1, borderColor: 'divider', p: 1 }}>
          <ToggleButtonGroup
            orientation="vertical"
            value={activeTool}
            exclusive
            onChange={handleToolChange}
            aria-label="DICOM tools"
            size="small"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="pan" aria-label="pan tool">
              <Tooltip title="Pan">
                <PanTool fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="zoom" aria-label="zoom tool">
              <Tooltip title="Zoom">
                <ZoomIn fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="window" aria-label="window level tool">
              <Tooltip title="Window Level">
                <Contrast fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="measure" aria-label="measure tool" onClick={handleAddMeasurement}>
              <Tooltip title="Measure">
                <Straighten fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="rotate" aria-label="rotate tool">
              <Tooltip title="Rotate">
                <Rotate90DegreesCcw fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Tooltip title="3D Rotation">
              <IconButton size="small">
                <ThreeDRotation fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Crop">
              <IconButton size="small">
                <Crop fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fullscreen" onClick={handleFullscreen}>
              <IconButton size="small">
                <Fullscreen fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton size="small">
                <Save fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton size="small">
                <Print fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Main content area */}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          {renderViews()}
        </Box>
        
        {/* Right sidebar with adjustments */}
        <Box sx={{ width: '220px', borderLeft: 1, borderColor: 'divider', p: 2, overflowY: 'auto' }}>
          <Typography gutterBottom>Brightness</Typography>
          <Slider
            value={brightness}
            onChange={handleBrightnessChange}
            aria-labelledby="brightness-slider"
            min={0}
            max={100}
            size="small"
          />
          
          <Typography gutterBottom sx={{ mt: 2 }}>Contrast</Typography>
          <Slider
            value={contrast}
            onChange={handleContrastChange}
            aria-labelledby="contrast-slider"
            min={0}
            max={100}
            size="small"
          />
          
          <Typography gutterBottom sx={{ mt: 2 }}>Zoom</Typography>
          <Slider
            value={zoom}
            onChange={handleZoomChange}
            aria-labelledby="zoom-slider"
            min={50}
            max={200}
            size="small"
          />
          
          <Box sx={{ mt: 3 }}>
            <Typography gutterBottom>Slice Navigation</Typography>
            <ButtonGroup variant="outlined" fullWidth size="small">
              <Button onClick={handlePreviousSlice} disabled={sliceIndex === 0}>Prev</Button>
              <Button onClick={handleNextSlice} disabled={sliceIndex === totalSlices - 1}>Next</Button>
            </ButtonGroup>
            <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
              Slice: {sliceIndex + 1} / {totalSlices}
            </Typography>
          </Box>
          
          {measurementData.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>Measurements</Typography>
              <Paper variant="outlined" sx={{ p: 1, maxHeight: '150px', overflowY: 'auto' }}>
                {measurementData.map((measurement) => (
                  <Box key={measurement.id} sx={{ mb: 1, fontSize: '0.85rem' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      {measurement.type}:
                    </Typography>
                    <Typography variant="body2">
                      {measurement.length} {measurement.unit} ({measurement.location})
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}