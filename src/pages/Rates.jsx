import React, { useContext } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import { CurrencyContext } from '../App';

function Rates() {
  const { exchangeRates, refreshExchangeRates } = useContext(CurrencyContext);
  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD', 'CAD'];

  return (
    <Container sx={{ py: 4, maxWidth: 'md' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Exchange Rates
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1">
            Current exchange rates relative to USD:
          </Typography>
          <Button variant="outlined" color="primary" onClick={refreshExchangeRates}>
            Refresh Rates
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell>Rate (1 USD = X)</TableCell>
                <TableCell>Rate (1 X = USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies.map((currency) => (
                <TableRow key={currency}>
                  <TableCell>{currency}</TableCell>
                  <TableCell>{exchangeRates[currency] ? exchangeRates[currency].toFixed(4) : 'N/A'}</TableCell>
                  <TableCell>{exchangeRates[currency] ? (1 / exchangeRates[currency]).toFixed(4) : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default Rates;
