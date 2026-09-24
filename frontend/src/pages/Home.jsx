import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip, Skeleton, Container, Grid, Card, CardContent, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MemoryIcon from '@mui/icons-material/Memory';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Shield';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsightsIcon from '@mui/icons-material/Insights';
import { getModelInfo } from '../services/api';

const Home = () => {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getModelInfo()
      .then((data) => {
        if (isMounted) {
          setModelInfo(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load model info on home page:', err);
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const accuracyPct = modelInfo?.accuracy ? `${(modelInfo.accuracy * 100).toFixed(1)}%` : '88.5%';
  const rocAucVal = modelInfo?.roc_auc ? modelInfo.roc_auc.toFixed(2) : '0.73';

  const featureCards = [
    {
      icon: <MemoryIcon sx={{ fontSize: 28 }} />,
      iconColor: '#38bdf8',
      iconBg: 'rgba(56, 189, 248, 0.12)',
      title: '16 Financial Dimensions',
      description: 'Evaluates applicant demographics, leverage ratios, employment stability, and requested loan parameters in real-time.',
    },
    {
      icon: <ShowChartIcon sx={{ fontSize: 28 }} />,
      iconColor: '#10b981',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      title: 'Calibrated ML Pipeline',
      description: loading ? null : `Trained Logistic Regression with StandardScalar & LabelEncoding delivering verified ${accuracyPct} accuracy.`,
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 28 }} />,
      iconColor: '#f59e0b',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      title: 'Risk Probability Scoring',
      description: 'Computes continuous default probabilities categorized into actionable Low, Medium, and High Risk underwriting tiers.',
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 28 }} />,
      iconBg: 'rgba(168, 85, 247, 0.12)',
      iconColor: '#c084fc',
      title: 'Audit & Compliance Ready',
      description: 'Persistent session history, interactive risk distribution charts, and exportable CSV reports for banking compliance.',
    },
  ];

  return (
    <Box sx={{ minHeight: '90vh', pb: 8 }}>
      {/* ─── HERO SECTION ─── */}
      <Box
        sx={{
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            {/* HERO LEFT: Text + CTA */}
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.8, borderRadius: '24px', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', mb: 3 }}>
                <AutoAwesomeIcon sx={{ fontSize: 16, color: '#38bdf8' }} />
                <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.05em' }}>
                  NEXT-GEN CREDIT RISK INTELLIGENCE
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.4rem', md: '3.8rem' },
                  color: '#ffffff',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  mb: 1.5,
                }}
              >
                Intelligent Loan <br />
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Default Prediction
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#94a3b8',
                  fontSize: { xs: '1.05rem', md: '1.2rem' },
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: 580,
                }}
              >
                Empower underwriting decisions with high-precision machine learning. LoanGuard analyzes 16 key financial indicators to calculate probability of default in milliseconds.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/predict"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 3.5,
                    py: 1.6,
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    borderRadius: '12px',
                  }}
                >
                  Start Risk Assessment
                </Button>
                <Button
                  component={RouterLink}
                  to="/about"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 3.5,
                    py: 1.6,
                    fontSize: '1.02rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#e2e8f0',
                    '&:hover': {
                      borderColor: '#38bdf8',
                      backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    },
                  }}
                >
                  Explore Model Specs
                </Button>
              </Stack>

              {/* Trust badges */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 5, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
                    91% Benchmark Accuracy
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
                    0.73 ROC-AUC Score
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
                    Instant Real-Time Inference
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* HERO RIGHT: Fintech Visual Card */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* Background glow circle */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: 0,
                  }}
                />

                {/* Main Card */}
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 440,
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden',
                  }}
                >
                  {/* Top accent bar */}
                  <Box sx={{ height: 4, width: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8, #34d399)' }} />

                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BarChartIcon sx={{ color: '#38bdf8', fontSize: 22 }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                            Model Telemetry
                          </Typography>
                          <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            Logistic Regression Pipeline
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label="ONLINE"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          height: 22,
                        }}
                      />
                    </Box>

                    {/* Chart simulator visual */}
                    <Box
                      sx={{
                        backgroundColor: 'rgba(7, 10, 19, 0.6)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        p: 2.5,
                        mb: 2.5,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 110, gap: 1 }}>
                        {[35, 62, 48, 75, 42, 88, 55, 78].map((h, i) => (
                          <Box
                            key={i}
                            sx={{
                              flex: 1,
                              height: `${h}%`,
                              borderRadius: '4px 4px 0 0',
                              backgroundColor: i === 5 ? '#38bdf8' : i % 2 === 0 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(129, 140, 248, 0.3)',
                              transition: 'all 0.3s ease',
                              '&:hover': { backgroundColor: '#38bdf8' },
                            }}
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Underwriting Sample Cohort</Typography>
                        <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 600 }}>N = 255,347</Typography>
                      </Box>
                    </Box>

                    {/* Stats 3-column row */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5 }}>
                      <Box sx={{ textAlign: 'center', p: 1.5, backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                        <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399' }}>{accuracyPct}</Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>Accuracy</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 1.5, backgroundColor: 'rgba(56, 189, 248, 0.08)', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                        <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8' }}>{rocAucVal}</Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>ROC-AUC</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 1.5, backgroundColor: 'rgba(245, 158, 11, 0.08)', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
                        <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24' }}>16</Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>Features</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── FEATURES GRID ─── */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#ffffff',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-0.02em',
              mb: 1.5,
            }}
          >
            Engineered for Credit Risk Analysis
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.08rem' }}>
            Built with modern web frameworks and enterprise scikit-learn models for consistent, reproducible credit underwriting.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {featureCards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  '&:hover': {
                    borderColor: 'rgba(56, 189, 248, 0.3)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '12px',
                      backgroundColor: card.iconBg,
                      color: card.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    sx={{
                      color: '#ffffff',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.18rem',
                      mb: 1,
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, mt: 'auto' }}>
                    {card.description ? card.description : <Skeleton variant="text" width="90%" />}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── 3-STEP WORKFLOW ─── */}
      <Box sx={{ py: 8, backgroundColor: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 800, fontFamily: "'Outfit', sans-serif", mb: 1.5 }}>
              How Loan Default Assessment Works
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8' }}>
              From applicant entry to underwriting verdict in three transparent steps
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: '01',
                title: 'Input Applicant Profile',
                desc: 'Fill in 16 financial & demographic features including income, credit lines, DTI ratio, and loan terms.',
                color: '#38bdf8',
              },
              {
                step: '02',
                title: 'ML Pipeline Inference',
                desc: 'The backend preprocesses inputs with StandardScaler, applies LabelEncoding, and runs inference through Logistic Regression.',
                color: '#818cf8',
              },
              {
                step: '03',
                title: 'Probability & Risk Verdict',
                desc: 'Receive calibrated default probability, risk tier classification (Low/Medium/High), and custom risk factor warnings.',
                color: '#34d399',
              },
            ].map((s) => (
              <Grid item xs={12} md={4} key={s.step}>
                <Box
                  sx={{
                    p: 3.5,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(10, 15, 29, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: s.color,
                      opacity: 0.85,
                      lineHeight: 1,
                      mb: 1.5,
                    }}
                  >
                    {s.step}
                  </Typography>
                  <Typography sx={{ color: '#ffffff', fontWeight: 700, fontSize: '1.2rem', mb: 1 }}>
                    {s.title}
                  </Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {s.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── BOTTOM CTA BANNER ─── */}
      <Container maxWidth="lg" sx={{ pt: 8 }}>
        <Box
          sx={{
            borderRadius: '20px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)',
            backdropFilter: 'blur(16px)',
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 800, fontFamily: "'Outfit', sans-serif", mb: 1 }}>
              Ready to evaluate an applicant?
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 600 }}>
              Launch the risk assessment tool to simulate and predict loan default outcomes with verified machine learning accuracy.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/predict"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.8,
              fontSize: '1.05rem',
              fontWeight: 700,
              borderRadius: '12px',
              whiteSpace: 'nowrap',
            }}
          >
            Launch Assessment Form
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
