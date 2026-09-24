import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#38bdf8', // Vibrant Sky Blue
      light: '#7dd3fc',
      dark: '#0284c7',
      contrastText: '#070a13',
    },
    secondary: {
      main: '#818cf8', // Modern Indigo
      light: '#a5b4fc',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#070a13', // Deep midnight slate
      paper: '#0f172a',   // Elevated card background
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      disabled: '#64748b',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#0f172a',
    },
    error: {
      main: '#f43f5e',
      light: '#fb7185',
      dark: '#e11d48',
      contrastText: '#ffffff',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(','),
    h1: { fontFamily: ['Outfit', 'Inter', 'sans-serif'].join(','), fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontFamily: ['Outfit', 'Inter', 'sans-serif'].join(','), fontWeight: 800, letterSpacing: '-0.025em' },
    h3: { fontFamily: ['Outfit', 'Inter', 'sans-serif'].join(','), fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: ['Outfit', 'Inter', 'sans-serif'].join(','), fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontFamily: ['Outfit', 'Inter', 'sans-serif'].join(','), fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontFamily: ['Outfit', 'Inter', 'sans-serif'].join(','), fontWeight: 600 },
    subtitle1: { fontWeight: 500, color: '#94a3b8' },
    subtitle2: { fontWeight: 500, color: '#64748b' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 22px',
          fontSize: '0.94rem',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)',
            boxShadow: '0 6px 20px rgba(56, 189, 248, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(56, 189, 248, 0.4)',
          color: '#38bdf8',
          '&:hover': {
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            '& fieldset': {
              border: 'none',
            },
            '&:hover': {
              borderColor: 'rgba(56, 189, 248, 0.35)',
            },
            '&.Mui-focused': {
              borderColor: '#38bdf8',
              boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.18)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94a3b8',
            '&.Mui-focused': {
              color: '#38bdf8',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
        },
      },
    },
  },
});

export default theme;
