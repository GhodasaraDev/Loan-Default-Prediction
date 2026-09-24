import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Chip, Divider, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PredictionResult from './PredictionResult';

const HistoryDetailsModal = ({ open, record, onClose }) => {
  if (!record) return null;

  const { id, timestamp, inputs = {}, result = {} } = record;
  const formattedDate = timestamp ? new Date(timestamp).toLocaleString() : 'N/A';

  const sectionBoxStyle = {
    p: 2.5,
    backgroundColor: 'rgba(7, 10, 19, 0.6)',
    borderRadius: '14px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: '#0f172a',
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1.5, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Box>
          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
            Assessment Record Inspection
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            ID: <span style={{ color: '#38bdf8' }}>{id}</span> &bull; Logged: {formattedDate}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#94a3b8' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        {/* Prediction Result Summary */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ color: '#38bdf8', mb: 1.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Model Inference Verdict
          </Typography>
          <PredictionResult result={result} />
        </Box>

        {/* Input Parameters Overview */}
        <Typography variant="subtitle2" sx={{ color: '#38bdf8', mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Applicant Input Parameters (16 Dimensions)
        </Typography>

        <Stack spacing={2.5}>
          {/* Section 1: Applicant Info */}
          <Box sx={sectionBoxStyle}>
            <Typography variant="subtitle2" sx={{ color: '#38bdf8', fontWeight: 700, mb: 2 }}>
              👤 Personal & Employment Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Age</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.Age} Years</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Annual Income</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>${Number(inputs.Income || 0).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Education</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.Education}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Employment</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.EmploymentType}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Marital Status</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.MaritalStatus}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Months Employed</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.MonthsEmployed} Mos</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Has Dependents</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.HasDependents === 1 || inputs.HasDependents === 'Yes' ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 2: Credit Info */}
          <Box sx={sectionBoxStyle}>
            <Typography variant="subtitle2" sx={{ color: '#34d399', fontWeight: 700, mb: 2 }}>
              💳 Credit & Leverage Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Credit Score</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.CreditScore}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Credit Lines</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.NumCreditLines}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>DTI Ratio</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{(Number(inputs.DTIRatio || 0) * 100).toFixed(1)}%</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Has Mortgage</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.HasMortgage === 1 || inputs.HasMortgage === 'Yes' ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Has Co-Signer</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.HasCoSigner === 1 || inputs.HasCoSigner === 'Yes' ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 3: Loan Info */}
          <Box sx={sectionBoxStyle}>
            <Typography variant="subtitle2" sx={{ color: '#fbbf24', fontWeight: 700, mb: 2 }}>
              🏦 Loan Request Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Loan Amount</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>${Number(inputs.LoanAmount || 0).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Interest Rate</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.InterestRate}%</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Loan Term</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.LoanTerm} Months</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Loan Purpose</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>{inputs.LoanPurpose}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close Inspection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoryDetailsModal;
