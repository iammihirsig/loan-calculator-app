import React, { useState } from 'react';
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
} from '@mui/material';

function Home() {
  // State for input fields
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  // State for results
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  // State for amortization schedule
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  // Calculate EMI and amortization schedule
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

    // Calculate amortization schedule
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

  // Handle form submission on button click
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEmi();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator
      </Typography>
      <Grid container spacing={3}>
        {/* Input Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enter Loan Details
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Loan Amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Annual Interest Rate (%)"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Loan Term (Years)"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Calculate
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            {emi ? (
              <>
                <Typography>
                  Monthly EMI: <strong>${emi}</strong>
                </Typography>
                <Typography>
                  Total Interest: <strong>${totalInterest}</strong>
                </Typography>
                <Typography>
                  Total Amount: <strong>${totalAmount}</strong>
                </Typography>
              </>
            ) : (
              <Typography>No results yet. Please enter loan details and calculate.</Typography>
            )}
          </Paper>
        </Grid>

        {/* Amortization Schedule */}
        {amortizationSchedule.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Amortization Schedule
              </Typography>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Principal</TableCell>
                      <TableCell>Interest</TableCell>
                      <TableCell>Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {amortizationSchedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>${row.payment}</TableCell>
                        <TableCell>${row.principal}</TableCell>
                        <TableCell>${row.interest}</TableCell>
                        <TableCell>${row.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Home;
