import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EmptyState = ({
  title = 'No Records Found',
  description = 'No assessment records have been logged in the current session yet.',
  actionText = 'Run Prediction Assessment',
  actionPath = '/predict',
}) => {
  return (
    <Card sx={{ textAlign: 'center', py: { xs: 4, md: 7 }, px: 3, maxWidth: 640, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2.5,
          }}
        >
          <InboxOutlinedIcon sx={{ fontSize: 36 }} />
        </Box>

        <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif", mb: 1.5 }}>
          {title}
        </Typography>

        <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3.5, lineHeight: 1.6, maxWidth: 480, mx: 'auto' }}>
          {description}
        </Typography>

        {actionText && actionPath && (
          <Button
            component={RouterLink}
            to={actionPath}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 3.5, py: 1.3, fontWeight: 700, borderRadius: '12px' }}
          >
            {actionText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
