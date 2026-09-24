import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography, Container, Stack } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import History from './pages/History';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#070a13',
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(56, 189, 248, 0.12), transparent), radial-gradient(ellipse 60% 40% at 90% 90%, rgba(99, 102, 241, 0.08), transparent), #070a13',
          color: '#f8fafc',
        }}
      >
        <Navbar />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Prediction />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>

        {/* Professional Dark Fintech Footer */}
        <Box
          component="footer"
          sx={{
            py: 4,
            px: 2,
            mt: 'auto',
            backgroundColor: 'rgba(10, 15, 29, 0.85)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                © {new Date().getFullYear()} <span style={{ color: '#38bdf8', fontWeight: 600 }}>LoanGuard</span> — Enterprise Credit Risk Intelligence Platform.
              </Typography>
              <Typography variant="caption" sx={{ color: '#475569' }}>
                FastAPI &bull; Scikit-learn &bull; React &bull; Material UI
              </Typography>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
