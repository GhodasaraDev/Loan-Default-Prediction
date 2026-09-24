import React from 'react';
import { Card, CardContent, Typography, Box, Grid, LinearProgress, Chip, Stack, Divider, Alert } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import FlagIcon from '@mui/icons-material/Flag';

const PredictionResult = ({ result }) => {
  if (!result) return null;

  const { prediction, prediction_label, default_probability, risk_level, recommendation, risk_factors } = result;

  const isDefault = prediction === 1;
  const probPct = (default_probability * 100).toFixed(1);

  // Dynamic Risk Tier Color Styling
  const getRiskDesign = () => {
    if (risk_level === 'High Risk' || isDefault) {
      return {
        main: '#f43f5e',
        light: '#fb7185',
        bg: 'rgba(244, 63, 94, 0.12)',
        border: 'rgba(244, 63, 94, 0.4)',
        glow: '0 0 35px rgba(244, 63, 94, 0.25)',
      };
    }
    if (risk_level === 'Medium Risk') {
      return {
        main: '#f59e0b',
        light: '#fbbf24',
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.4)',
        glow: '0 0 35px rgba(245, 158, 11, 0.2)',
      };
    }
    return {
      main: '#10b981',
      light: '#34d399',
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.4)',
      glow: '0 0 35px rgba(16, 185, 129, 0.2)',
    };
  };

  const style = getRiskDesign();

  return (
    <Card
      sx={{
        borderRadius: '20px',
        border: `1.5px solid ${style.border}`,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        boxShadow: style.glow,
        overflow: 'hidden',
      }}
    >
      {/* Top Status Banner */}
      <Box
        sx={{
          backgroundColor: style.bg,
          px: { xs: 2.5, md: 3.5 },
          py: 2.5,
          borderBottom: `1px solid ${style.border}`,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} flexWrap="wrap">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                backgroundColor: style.main,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 14px ${style.border}`,
              }}
            >
              {isDefault ? (
                <WarningAmberIcon sx={{ fontSize: 30 }} />
              ) : (
                <CheckCircleOutlinedIcon sx={{ fontSize: 30 }} />
              )}
            </Box>
            <Box>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 600 }}>
                Machine Learning Risk Verdict
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: style.light,
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: { xs: '1.4rem', md: '1.7rem' },
                }}
              >
                {prediction_label === 'Default' ? 'Likely to Default (High Risk)' : 'Approved (Low Default Risk)'}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={risk_level}
            sx={{
              backgroundColor: style.main,
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              px: 1.5,
              py: 2.2,
              borderRadius: '12px',
              letterSpacing: '0.04em',
            }}
          />
        </Stack>
      </Box>

      <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Grid container spacing={3}>
          {/* Probability Indicator Panel */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: 3,
                backgroundColor: 'rgba(7, 10, 19, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SpeedIcon sx={{ fontSize: 20, color: '#38bdf8' }} />
                <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>
                  ESTIMATED DEFAULT PROBABILITY
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  color: '#ffffff',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: { xs: '2.8rem', md: '3.4rem' },
                  my: 0.5,
                }}
              >
                {probPct}%
              </Typography>

              <Box sx={{ my: 1.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(default_probability * 100, 100)}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: style.main,
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>0% (Safe)</Typography>
                <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>25% Threshold</Typography>
                <Typography variant="caption" sx={{ color: '#f43f5e', fontWeight: 600 }}>100% (Default)</Typography>
              </Stack>
            </Box>
          </Grid>

          {/* Key Risk Profile Drivers */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                p: 3,
                backgroundColor: 'rgba(7, 10, 19, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FlagIcon sx={{ fontSize: 20, color: '#f59e0b' }} />
                <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em' }}>
                  RISK PROFILE DRIVERS & FACTORS
                </Typography>
              </Box>

              <Stack spacing={1.5}>
                {risk_factors && risk_factors.length > 0 ? (
                  risk_factors.map((factor, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        p: 1.5,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderLeft: `3px solid ${style.main}`,
                        color: '#cbd5e1',
                        fontSize: '0.92rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {factor}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    All financial indicators within standard tolerance limits.
                  </Typography>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Underwriting Recommendation Callout */}
        <Alert
          icon={<InfoOutlinedIcon sx={{ color: '#38bdf8' }} />}
          severity="info"
          sx={{
            backgroundColor: 'rgba(56, 189, 248, 0.08)',
            color: '#e0f2fe',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '14px',
            p: 2,
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            <strong style={{ color: '#38bdf8' }}>Underwriting Recommendation:</strong> {recommendation || 'Continuous statistical probability output from Logistic Regression model. Use alongside institutional compliance criteria.'}
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
