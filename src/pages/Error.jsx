import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <Container sx={{ py: 4, textAlign: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Something went wrong in the application.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
        >
          Go Home
        </Button>
      </Paper>
    </Container>
  );
}

export default Error;
