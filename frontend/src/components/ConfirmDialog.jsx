import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ConfirmDialog = ({ open, title, content, onConfirm, onCancel, confirmText = 'Delete', confirmColor = 'error' }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: '#0f172a',
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          p: 1,
          maxWidth: 460,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1, color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
        <Box sx={{ p: 1, borderRadius: '10px', backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', display: 'flex' }}>
          <WarningAmberIcon fontSize="medium" />
        </Box>
        {title || 'Confirm Action'}
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <DialogContentText sx={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {content || 'Are you sure you want to proceed with this action? This operation cannot be reversed.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, borderTop: '1px solid rgba(255, 255, 255, 0.06)', pt: 2 }}>
        <Button onClick={onCancel} variant="outlined" sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: '#cbd5e1', borderRadius: '10px' }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color={confirmColor} autoFocus sx={{ borderRadius: '10px' }}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
