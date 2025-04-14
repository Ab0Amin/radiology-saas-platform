import TenantRegistration from '../components/tenant/TenantRegistration';
import { Container, Typography, Box } from '@mui/material';

export default function RegisterPage() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register Your Radiology Center
        </Typography>
        <TenantRegistration />
      </Box>
    </Container>
  );
}