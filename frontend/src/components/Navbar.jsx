import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Button, Stack, useTheme, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Chip } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Risk Assessment', path: '/predict' },
    { label: 'Audit History', path: '/history' },
    { label: 'About Model', path: '/about' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(7, 10, 19, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
            {/* Logo & Brand Header */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1.5,
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.9 },
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(2, 132, 199, 0.4)',
                }}
              >
                <SecurityIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      lineHeight: 1.1,
                      fontSize: '1.3rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    LoanGuard
                  </Typography>
                  <Chip
                    label="AI ENGINE"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      backgroundColor: 'rgba(56, 189, 248, 0.12)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#94a3b8',
                    fontSize: '0.72rem',
                    letterSpacing: '0.02em',
                    display: 'block',
                  }}
                >
                  Enterprise Credit Risk Platform
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            {!isMobile ? (
              <Stack direction="row" spacing={1} alignItems="center">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: isActive ? '#38bdf8' : '#94a3b8',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.92rem',
                        backgroundColor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                        borderRadius: '10px',
                        padding: '8px 16px',
                        border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#ffffff',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
                <Button
                  component={RouterLink}
                  to="/predict"
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 1,
                    px: 2.5,
                    py: 1,
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                  }}
                >
                  Assess Loan
                </Button>
              </Stack>
            ) : (
              /* Mobile Hamburger Button */
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#0c1222',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            p: 2.5,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
            Navigation
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#94a3b8' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 0 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  selected={isActive}
                  sx={{
                    borderRadius: '10px',
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : 'none',
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#ffffff',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: '0.95rem' }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
