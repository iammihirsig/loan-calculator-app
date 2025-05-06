import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <Container sx={{ py: 8, textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Something went wrong in the application.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Paper>
    </Container>
  );
}

export default Error;
