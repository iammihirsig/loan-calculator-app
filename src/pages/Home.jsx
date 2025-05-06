import React, { useState, useContext } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalculateIcon from '@mui/icons-material/Calculate';
import { CurrencyContext } from '../App';

function Home() {
  const { selectedCurrency, setSelectedCurrency, exchangeRates } = useContext(CurrencyContext);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD', 'CAD'];

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (!principal || !annualRate || !years || principal <= 0 || annualRate <= 0 || years <= 0) {
      setEmi(null);
      setTotalInterest(null);
      setTotalAmount(null);
      setAmortizationSchedule([]);
      return;
    }

    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / denominator;

    const totalPayment = emiValue * months;
    const totalInterestValue = totalPayment - principal;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalAmount(totalPayment.toFixed(2));

    let balance = principal;
    const schedule = [];
    for (let month = 1; month <= months; month++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = emiValue - interestForMonth;
      balance -= principalForMonth;

      schedule.push({
        month,
        payment: emiValue.toFixed(2),
        principal: principalForMonth.toFixed(2),
        interest: interestForMonth.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }
    setAmortizationSchedule(schedule);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEmi();
  };

  const resetTable = () => {
    setAmortizationSchedule([]);
    setEmi(null);
    setTotalInterest(null);
    setTotalAmount(null);
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
  };

  // Convert amount from USD to selected currency
  const convertToCurrency = (amount) => {
    if (!exchangeRates[selectedCurrency] || selectedCurrency === 'USD') return parseFloat(amount).toFixed(2);
    const rate = exchangeRates[selectedCurrency];
    return (parseFloat(amount) * rate).toFixed(2);
  };

  return (
    <Container
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: amortizationSchedule.length > 0 ? 'flex-start' : 'center',
        alignItems: 'center',
        py: 3,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '800px', mb: amortizationSchedule.length > 0 ? 3 : 0 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          Loan Calculator
        </Typography>

        {/* Currency Dropdown */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              value={selectedCurrency}
              label="Currency"
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          {/* Input Form */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Enter Loan Details
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <TextField
                  label="Loan Amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  fullWidth
                  margin="dense"
                  required
                  variant="filled"
                />
                <TextField
                  label="Annual Interest Rate (%)"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  fullWidth
                  margin="dense"
                  required
                  variant="filled"
                />
                <TextField
                  label="Loan Term (Years)"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  fullWidth
                  margin="dense"
                  required
                  variant="filled"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 'auto', width: '100%' }}
                >
                  Calculate
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Results
              </Typography>
              {emi ? (
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <MonetizationOnIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Monthly EMI: ${convertToCurrency(emi)} ${selectedCurrency}`}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalculateIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Total Interest: ${convertToCurrency(totalInterest)} ${selectedCurrency}`}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccountBalanceIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Total Amount: ${convertToCurrency(totalAmount)} ${selectedCurrency}`}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No results yet. Please enter loan details and calculate.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Amortization Schedule */}
      {amortizationSchedule.length > 0 && (
        <Box sx={{ width: '60vw', maxWidth: '100%', mx: 'auto', mt: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Amortization Schedule
              </Typography>
              <Button variant="outlined" color="secondary" onClick={resetTable}>
                Reset Table
              </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Payment ({selectedCurrency})</TableCell>
                    <TableCell>Principal ({selectedCurrency})</TableCell>
                    <TableCell>Interest ({selectedCurrency})</TableCell>
                    <TableCell>Balance ({selectedCurrency})</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationSchedule.map((row, index) => (
                    <TableRow
                      key={row.month}
                      sx={{
                        backgroundColor:
                          index % 2 === 0
                            ? 'background.paper'
                            : 'background.default',
                      }}
                    >
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{convertToCurrency(row.payment)}</TableCell>
                      <TableCell>{convertToCurrency(row.principal)}</TableCell>
                      <TableCell>{convertToCurrency(row.interest)}</TableCell>
                      <TableCell>{convertToCurrency(row.balance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default Home;
