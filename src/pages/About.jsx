import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

function About() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          This Loan Calculator application helps you calculate your monthly EMI, total interest, and total amount payable for a loan. It also provides an amortization schedule to see the breakdown of your payments over time. The app supports light and dark modes for better usability and is built using modern web technologies like React and Material UI.
        </Typography>
        <Typography variant="body1">
          Use the calculator on the Home page to input your loan amount, interest rate, and loan term, and get instant results. Future updates will include live exchange rate features for currency conversion.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;
