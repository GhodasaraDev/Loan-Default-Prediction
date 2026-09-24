import React, { useState, useRef } from 'react';
import {
  Container, Box, Typography, Card, CardContent, Grid, TextField, MenuItem,
  Button, CircularProgress, Alert, InputAdornment, Tooltip, Stack, Chip, Slider
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { predictLoanDefault } from '../services/api';
import { savePredictionRecord } from '../services/historyStorage';
import PredictionResult from '../components/PredictionResult';

const defaultFormData = {
  Age: 35,
  Income: 75000,
  Education: "Bachelor's",
  EmploymentType: 'Full-time',
  MaritalStatus: 'Single',
  MonthsEmployed: 48,
  HasDependents: 0,
  CreditScore: 720,
  NumCreditLines: 4,
  DTIRatio: 0.28,
  HasMortgage: 0,
  HasCoSigner: 1,
  LoanAmount: 25000,
  InterestRate: 7.5,
  LoanTerm: 36,
  LoanPurpose: 'Home',
};

const lowRiskPreset = {
  Age: 42,
  Income: 120000,
  Education: "Master's",
  EmploymentType: 'Full-time',
  MaritalStatus: 'Married',
  MonthsEmployed: 84,
  HasDependents: 1,
  CreditScore: 790,
  NumCreditLines: 3,
  DTIRatio: 0.18,
  HasMortgage: 1,
  HasCoSigner: 1,
  LoanAmount: 20000,
  InterestRate: 5.5,
  LoanTerm: 36,
  LoanPurpose: 'Home',
};

const highRiskPreset = {
  Age: 22,
  Income: 24000,
  Education: 'High School',
  EmploymentType: 'Part-time',
  MaritalStatus: 'Single',
  MonthsEmployed: 4,
  HasDependents: 1,
  CreditScore: 540,
  NumCreditLines: 7,
  DTIRatio: 0.58,
  HasMortgage: 0,
  HasCoSigner: 0,
  LoanAmount: 65000,
  InterestRate: 18.5,
  LoanTerm: 60,
  LoanPurpose: 'Other',
};

const Prediction = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const resultRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const applyPreset = (preset) => {
    setFormData({ ...preset });
    setErrors({});
    setApiError(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Age || formData.Age < 18 || formData.Age > 100) {
      newErrors.Age = 'Age must be between 18 and 100';
    }
    if (!formData.Income || Number(formData.Income) <= 0) {
      newErrors.Income = 'Annual income must be greater than 0';
    }
    if (formData.MonthsEmployed < 0) {
      newErrors.MonthsEmployed = 'Months employed cannot be negative';
    }
    if (!formData.CreditScore || formData.CreditScore < 300 || formData.CreditScore > 850) {
      newErrors.CreditScore = 'Credit score must be between 300 and 850';
    }
    if (formData.NumCreditLines < 0) {
      newErrors.NumCreditLines = 'Number of credit lines cannot be negative';
    }
    if (formData.DTIRatio === '' || formData.DTIRatio < 0 || formData.DTIRatio > 1) {
      newErrors.DTIRatio = 'DTI ratio must be a decimal between 0.0 and 1.0 (e.g. 0.28 for 28%)';
    }
    if (!formData.LoanAmount || Number(formData.LoanAmount) <= 0) {
      newErrors.LoanAmount = 'Loan amount must be greater than 0';
    }
    if (formData.InterestRate === '' || Number(formData.InterestRate) < 0) {
      newErrors.InterestRate = 'Interest rate must be 0 or greater';
    }
    if (!formData.LoanTerm || Number(formData.LoanTerm) <= 0) {
      newErrors.LoanTerm = 'Loan term must be greater than 0 months';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        Age: parseInt(formData.Age, 10),
        Income: parseFloat(formData.Income),
        LoanAmount: parseFloat(formData.LoanAmount),
        CreditScore: parseInt(formData.CreditScore, 10),
        MonthsEmployed: parseInt(formData.MonthsEmployed, 10),
        NumCreditLines: parseInt(formData.NumCreditLines, 10),
        InterestRate: parseFloat(formData.InterestRate),
        LoanTerm: parseInt(formData.LoanTerm, 10),
        DTIRatio: parseFloat(formData.DTIRatio),
        Education: formData.Education,
        EmploymentType: formData.EmploymentType,
        MaritalStatus: formData.MaritalStatus,
        HasMortgage: parseInt(formData.HasMortgage, 10),
        HasDependents: parseInt(formData.HasDependents, 10),
        LoanPurpose: formData.LoanPurpose,
        HasCoSigner: parseInt(formData.HasCoSigner, 10),
      };

      const result = await predictLoanDefault(payload);
      setPredictionResult(result);

      // Save complete input & prediction record into localStorage history
      savePredictionRecord(payload, result);

      // Smooth auto-scroll to the prediction result section
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Prediction Submission Error:', err);
      setApiError(err.message || 'Unable to connect to the prediction API backend. Please ensure uvicorn backend.main:app is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Header Title & Presets */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 800, fontFamily: "'Outfit', sans-serif", mb: 0.5 }}>
              Credit Risk Assessment Form
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8' }}>
              Fill in the 16 applicant and financial indicators to generate an AI default risk verdict.
            </Typography>
          </Box>

          {/* Quick Presets */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button
              size="small"
              variant="outlined"
              color="success"
              startIcon={<CheckCircleOutlinedIcon />}
              onClick={() => applyPreset(lowRiskPreset)}
              sx={{ borderColor: 'rgba(16, 185, 129, 0.4)', borderRadius: '10px' }}
            >
              Low Risk Sample
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<WarningAmberIcon />}
              onClick={() => applyPreset(highRiskPreset)}
              sx={{ borderColor: 'rgba(239, 68, 68, 0.4)', borderRadius: '10px' }}
            >
              High Risk Sample
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={() => applyPreset(defaultFormData)}
              sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: '#94a3b8', borderRadius: '10px' }}
            >
              Reset
            </Button>
          </Stack>
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          {/* SECTION 1: APPLICANT INFORMATION */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Box sx={{ p: 1.2, borderRadius: '12px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex' }}>
                  <PersonOutlineIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                    Section 1: Applicant Demographics & Employment
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Personal history, employment duration, and dependent obligations
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="Age"
                    type="number"
                    value={formData.Age}
                    onChange={handleChange}
                    error={Boolean(errors.Age)}
                    helperText={errors.Age || "Applicant age (18 - 100)"}
                    InputProps={{ inputProps: { min: 18, max: 100 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Annual Gross Income"
                    name="Income"
                    type="number"
                    value={formData.Income}
                    onChange={handleChange}
                    error={Boolean(errors.Income)}
                    helperText={errors.Income || 'Gross annual income (USD)'}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Education Level"
                    name="Education"
                    value={formData.Education}
                    onChange={handleChange}
                    helperText="Highest degree achieved"
                  >
                    <MenuItem value="High School">High School</MenuItem>
                    <MenuItem value="Bachelor's">Bachelor's Degree</MenuItem>
                    <MenuItem value="Master's">Master's Degree</MenuItem>
                    <MenuItem value="PhD">Doctorate (PhD)</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Employment Status"
                    name="EmploymentType"
                    value={formData.EmploymentType}
                    onChange={handleChange}
                    helperText="Current employment classification"
                  >
                    <MenuItem value="Full-time">Full-time (Salaried)</MenuItem>
                    <MenuItem value="Part-time">Part-time (Hourly)</MenuItem>
                    <MenuItem value="Self-employed">Self-employed</MenuItem>
                    <MenuItem value="Unemployed">Unemployed</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Marital Status"
                    name="MaritalStatus"
                    value={formData.MaritalStatus}
                    onChange={handleChange}
                    helperText="Current civil status"
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Months in Current Job"
                    name="MonthsEmployed"
                    type="number"
                    value={formData.MonthsEmployed}
                    onChange={handleChange}
                    error={Boolean(errors.MonthsEmployed)}
                    helperText={errors.MonthsEmployed || 'Continuous tenure in current role'}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Has Dependents"
                    name="HasDependents"
                    value={formData.HasDependents}
                    onChange={handleChange}
                    helperText="Supporting legal financial dependents"
                  >
                    <MenuItem value={1}>Yes (Dependents Present)</MenuItem>
                    <MenuItem value={0}>No Dependents</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* SECTION 2: CREDIT INFORMATION */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Box sx={{ p: 1.2, borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex' }}>
                  <CreditScoreIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                    Section 2: Credit History & Debt Position
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Credit bureau rating, leverage ratios, and existing collateral
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Credit Score (FICO)"
                    name="CreditScore"
                    type="number"
                    value={formData.CreditScore}
                    onChange={handleChange}
                    error={Boolean(errors.CreditScore)}
                    helperText={errors.CreditScore || 'Range: 300 to 850'}
                    InputProps={{ inputProps: { min: 300, max: 850 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Active Credit Lines"
                    name="NumCreditLines"
                    type="number"
                    value={formData.NumCreditLines}
                    onChange={handleChange}
                    error={Boolean(errors.NumCreditLines)}
                    helperText={errors.NumCreditLines || 'Total credit cards and open accounts'}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Debt-to-Income (DTI) Ratio"
                    name="DTIRatio"
                    type="number"
                    value={formData.DTIRatio}
                    onChange={handleChange}
                    error={Boolean(errors.DTIRatio)}
                    helperText={errors.DTIRatio || 'Monthly debt / Monthly income (e.g. 0.28)'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Total monthly debt payments divided by gross monthly income (0.0 to 1.0)">
                            <HelpOutlineIcon fontSize="small" sx={{ color: '#64748b' }} />
                          </Tooltip>
                        </InputAdornment>
                      ),
                      inputProps: { step: 0.01, min: 0, max: 1 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Existing Mortgage"
                    name="HasMortgage"
                    value={formData.HasMortgage}
                    onChange={handleChange}
                    helperText="Does applicant have an active home mortgage?"
                  >
                    <MenuItem value={1}>Yes (Active Mortgage)</MenuItem>
                    <MenuItem value={0}>No Mortgage</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Co-Signer Guarantee"
                    name="HasCoSigner"
                    value={formData.HasCoSigner}
                    onChange={handleChange}
                    helperText="Is a secondary co-signer backing this loan?"
                  >
                    <MenuItem value={1}>Yes (Co-Signer Backed)</MenuItem>
                    <MenuItem value={0}>No Co-Signer</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* SECTION 3: LOAN PARAMETERS */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Box sx={{ p: 1.2, borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex' }}>
                  <AccountBalanceWalletIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                    Section 3: Requested Loan Specifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Principal requested, annual interest rate, duration, and stated purpose
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Requested Principal"
                    name="LoanAmount"
                    type="number"
                    value={formData.LoanAmount}
                    onChange={handleChange}
                    error={Boolean(errors.LoanAmount)}
                    helperText={errors.LoanAmount || 'Requested loan sum in USD'}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Annual Interest Rate (%)"
                    name="InterestRate"
                    type="number"
                    value={formData.InterestRate}
                    onChange={handleChange}
                    error={Boolean(errors.InterestRate)}
                    helperText={errors.InterestRate || 'Interest rate percentage per annum'}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      inputProps: { step: 0.1, min: 0 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Loan Duration"
                    name="LoanTerm"
                    value={formData.LoanTerm}
                    onChange={handleChange}
                    helperText="Amortization period in months"
                  >
                    <MenuItem value={12}>12 Months (1 Year)</MenuItem>
                    <MenuItem value={24}>24 Months (2 Years)</MenuItem>
                    <MenuItem value={36}>36 Months (3 Years)</MenuItem>
                    <MenuItem value={48}>48 Months (4 Years)</MenuItem>
                    <MenuItem value={60}>60 Months (5 Years)</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    select
                    label="Stated Loan Purpose"
                    name="LoanPurpose"
                    value={formData.LoanPurpose}
                    onChange={handleChange}
                    helperText="Intended usage category"
                  >
                    <MenuItem value="Home">Home Purchase / Renovation</MenuItem>
                    <MenuItem value="Auto">Vehicle / Auto Purchase</MenuItem>
                    <MenuItem value="Education">Higher Education Tuition</MenuItem>
                    <MenuItem value="Business">Small Business Expansion</MenuItem>
                    <MenuItem value="Other">Personal / Debt Consolidation</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* API ERROR ALERT */}
          {apiError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fecdd3',
              }}
            >
              {apiError}
            </Alert>
          )}

          {/* SUBMIT ACTION BUTTON */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{
                px: 6,
                py: 1.8,
                fontSize: '1.08rem',
                fontWeight: 700,
                borderRadius: '12px',
                minWidth: 280,
              }}
            >
              {loading ? 'Evaluating Model...' : 'Execute Default Prediction'}
            </Button>
          </Box>
        </form>

        {/* RESULT PRESENTATION (WITH AUTO SCROLL TARGET) */}
        <Box ref={resultRef}>
          {predictionResult && (
            <Box sx={{ pt: 1, pb: 4 }}>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 800, fontFamily: "'Outfit', sans-serif", mb: 2.5 }}>
                Assessment Output & Underwriting Decision
              </Typography>
              <PredictionResult result={predictionResult} />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Prediction;
