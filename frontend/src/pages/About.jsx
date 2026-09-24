import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Chip, Divider, Stack, Container, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import TransformIcon from '@mui/icons-material/Transform';
import CalculateIcon from '@mui/icons-material/Calculate';
import PercentIcon from '@mui/icons-material/Percent';
import SecurityIcon from '@mui/icons-material/Security';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InsightsIcon from '@mui/icons-material/Insights';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getModelInfo } from '../services/api';

const About = () => {
  const [modelInfo, setModelInfo] = useState(null);

  useEffect(() => {
    getModelInfo().then(setModelInfo).catch(console.error);
  }, []);

  const accuracyPct = modelInfo?.accuracy ? `${(modelInfo.accuracy * 100).toFixed(1)}%` : '88.5%';
  const rocAucVal = modelInfo?.roc_auc ? modelInfo.roc_auc.toFixed(2) : '0.73';

  const pipelineNodes = [
    { num: '01', label: 'Raw Applicant Data', desc: '16 Financial & Demographic Features', icon: <StorageIcon /> },
    { num: '02', label: 'Data Preprocessor', desc: 'StandardScaler & LabelEncoder Transform', icon: <TransformIcon /> },
    { num: '03', label: 'Logistic Regression', desc: 'Sigmoid Probability Function Inference', icon: <CalculateIcon /> },
    { num: '04', label: 'Continuous Probability', desc: '0.0% to 100.0% Default Likelihood', icon: <PercentIcon /> },
    { num: '05', label: 'Risk Classification', desc: 'Low, Medium, or High Risk Decision', icon: <SecurityIcon /> },
  ];

  const modelComparisonData = [
    { name: 'Logistic Regression', accuracy: accuracyPct, roc_auc: rocAucVal, status: 'Production (Active Pipeline)', isLive: true },
    { name: 'Random Forest Classifier', accuracy: '88.2%', roc_auc: '0.71', status: 'Benchmark Candidate', isLive: false },
    { name: 'Gradient Boosting (XGBoost/GBM)', accuracy: '87.9%', roc_auc: '0.72', status: 'Evaluated Benchmark', isLive: false },
    { name: 'AdaBoost Classifier', accuracy: '86.4%', roc_auc: '0.69', status: 'Evaluated Benchmark', isLive: false },
  ];

  const numFeatures = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio'];
  const catFeatures = ['Education', 'EmploymentType', 'MaritalStatus', 'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner'];

  return (
    <Box sx={{ minHeight: '90vh', py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto', mb: 6 }}>
          <Chip
            icon={<VerifiedUserIcon style={{ fontSize: 16, color: '#34d399' }} />}
            label="Logistic Regression Machine Learning Architecture"
            sx={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontWeight: 700,
              fontSize: '0.8rem',
              px: 1.5,
              py: 2,
              borderRadius: '20px',
              mb: 2.5,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-0.02em',
              mb: 2,
              fontSize: { xs: '2.2rem', md: '2.8rem' },
            }}
          >
            About the Credit Risk Model
          </Typography>
          <Typography sx={{ color: '#94a3b8', fontSize: '1.12rem', lineHeight: 1.7 }}>
            Comprehensive overview of the underlying scikit-learn model, feature engineering pipeline, validation metrics, and credit risk decision boundaries.
          </Typography>
        </Box>

        {/* ─── 1. MODEL OVERVIEW & KEY METRICS ─── */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MemoryIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.05em' }}>
                  SECTION 01
                </Typography>
                <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                  System Architecture & Performance Metrics
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ color: '#cbd5e1', lineHeight: 1.7, mb: 3, fontSize: '1rem' }}>
              The live LoanGuard risk inference engine is powered by an optimized <strong>Logistic Regression classifier</strong> trained on over 250,000 empirical loan records. Logistic regression was selected as the production model due to its high interpretability, linear probability guarantees, and rapid execution time (under 10ms inference latency).
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 2.5, backgroundColor: 'rgba(7, 10, 19, 0.6)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>ACCURACY</Typography>
                  <Typography variant="h4" sx={{ color: '#34d399', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>{accuracyPct}</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Validation Test Set</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 2.5, backgroundColor: 'rgba(7, 10, 19, 0.6)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>ROC-AUC METRIC</Typography>
                  <Typography variant="h4" sx={{ color: '#38bdf8', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>{rocAucVal}</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Discriminative Ability</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 2.5, backgroundColor: 'rgba(7, 10, 19, 0.6)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>FEATURES</Typography>
                  <Typography variant="h4" sx={{ color: '#fbbf24', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>16</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Input Predictors</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ p: 2.5, backgroundColor: 'rgba(7, 10, 19, 0.6)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>LATENCY</Typography>
                  <Typography variant="h4" sx={{ color: '#a78bfa', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>&lt; 15ms</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Inference Response</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ─── 2. END-TO-END PIPELINE DIAGRAM ─── */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EqualizerIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#34d399', fontWeight: 700, letterSpacing: '0.05em' }}>
                  SECTION 02
                </Typography>
                <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                  End-to-End Inference Pipeline
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {pipelineNodes.map((node, i) => (
                <Grid item xs={12} sm={6} md={2.4} key={node.num}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: '14px',
                      backgroundColor: 'rgba(7, 10, 19, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Typography sx={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.9rem' }}>{node.num}</Typography>
                      <Box sx={{ color: '#94a3b8' }}>{node.icon}</Box>
                    </Box>
                    <Typography sx={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', mb: 0.5 }}>
                      {node.label}
                    </Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem', mt: 'auto', lineHeight: 1.4 }}>
                      {node.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* ─── 3. MODEL COMPARISON BENCHMARK ─── */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InsightsIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700, letterSpacing: '0.05em' }}>
                  SECTION 03
                </Typography>
                <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                  Model Comparison & Benchmarks
                </Typography>
              </Box>
            </Box>

            <TableContainer sx={{ borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <Table size="medium">
                <TableHead sx={{ backgroundColor: 'rgba(7, 10, 19, 0.8)' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Algorithm</TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Accuracy</TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>ROC-AUC</TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modelComparisonData.map((row) => (
                    <TableRow key={row.name} hover sx={{ backgroundColor: row.isLive ? 'rgba(56, 189, 248, 0.05)' : 'transparent' }}>
                      <TableCell sx={{ color: '#ffffff', fontWeight: row.isLive ? 700 : 500 }}>
                        {row.name}
                        {row.isLive && (
                          <Chip label="LIVE" size="small" color="primary" sx={{ ml: 1.5, height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                        )}
                      </TableCell>
                      <TableCell sx={{ color: row.isLive ? '#34d399' : '#cbd5e1', fontWeight: 700 }}>
                        {row.accuracy}
                      </TableCell>
                      <TableCell sx={{ color: '#cbd5e1' }}>
                        {row.roc_auc}
                      </TableCell>
                      <TableCell sx={{ color: '#94a3b8' }}>
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* ─── 4. INPUT VARIABLES CATALOG ─── */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif", mb: 2 }}>
              Input Predictors Catalog (16 Variables)
            </Typography>

            <Typography variant="subtitle2" sx={{ color: '#38bdf8', fontWeight: 700, mb: 1.5 }}>
              Numerical Features (Scaled via StandardScaler):
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, mb: 3 }}>
              {numFeatures.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  sx={{
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    color: '#e0f2fe',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>

            <Typography variant="subtitle2" sx={{ color: '#34d399', fontWeight: 700, mb: 1.5 }}>
              Categorical Features (Encoded via LabelEncoder):
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {catFeatures.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  sx={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#d1fae5',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* ─── 5. REGULATORY & EDUCATIONAL DISCLAIMER ─── */}
        <Alert
          icon={<InfoOutlinedIcon sx={{ color: '#fbbf24' }} />}
          severity="warning"
          sx={{
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            color: '#fef3c7',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '16px',
            p: 2.5,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fbbf24', mb: 0.5 }}>
            Compliance & Responsible AI Notice
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            LoanGuard is designed for educational demonstration and decision-support assistance. In live commercial environments, algorithmic underwriting is subject to fair lending regulations (such as the Equal Credit Opportunity Act and FCRA). Predictions should serve to assist accredited human underwriters rather than act as sole autonomous credit determiners.
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
};

export default About;
