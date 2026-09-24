import React, { useState, useMemo } from 'react';
import {
  Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, MenuItem, Stack, Button, Chip, IconButton, Tooltip, InputAdornment, useTheme, useMediaQuery, Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EmptyState from './EmptyState';

const HistoryTable = ({
  history = [],
  onViewRecord,
  onDeleteRecord,
  onClearAll,
  onExportCSV,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [predFilter, setPredFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');

  // Filter and Sort Logic
  const filteredHistory = useMemo(() => {
    return history
      .filter((item) => {
        const res = item.result || {};
        const inp = item.inputs || {};

        // Search term matching
        const searchLower = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !searchLower ||
          (res.risk_level && res.risk_level.toLowerCase().includes(searchLower)) ||
          (res.prediction_label && res.prediction_label.toLowerCase().includes(searchLower)) ||
          (inp.Income && inp.Income.toString().includes(searchLower)) ||
          (inp.LoanAmount && inp.LoanAmount.toString().includes(searchLower)) ||
          (inp.CreditScore && inp.CreditScore.toString().includes(searchLower)) ||
          (inp.EmploymentType && inp.EmploymentType.toLowerCase().includes(searchLower)) ||
          (inp.LoanPurpose && inp.LoanPurpose.toLowerCase().includes(searchLower));

        // Risk level filter
        const matchesRisk = riskFilter === 'All' || res.risk_level === riskFilter;

        // Prediction filter
        const matchesPred = predFilter === 'All' || res.prediction_label === predFilter;

        return matchesSearch && matchesRisk && matchesPred;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
        if (sortBy === 'date_asc') {
          return new Date(a.timestamp) - new Date(b.timestamp);
        }
        if (sortBy === 'prob_desc') {
          return (b.result?.default_probability || 0) - (a.result?.default_probability || 0);
        }
        if (sortBy === 'prob_asc') {
          return (a.result?.default_probability || 0) - (b.result?.default_probability || 0);
        }
        return 0;
      });
  }, [history, searchTerm, riskFilter, predFilter, sortBy]);

  const getRiskChipColor = (riskLevel) => {
    if (riskLevel === 'High Risk') return { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.35)' };
    if (riskLevel === 'Medium Risk') return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.35)' };
    return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.35)' };
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        {/* Header Title & Top Actions */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
              Prediction Audit History Records
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Showing {filteredHistory.length} of {history.length} saved assessments
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={onExportCSV}
              disabled={history.length === 0}
              sx={{ borderRadius: '10px' }}
            >
              Export CSV
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={onClearAll}
              disabled={history.length === 0}
              sx={{ borderRadius: '10px' }}
            >
              Clear All
            </Button>
          </Stack>
        </Stack>

        {/* Filter Controls Toolbar */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search income, credit score, purpose..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 260, flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <TextField
              select
              size="small"
              label="Risk Level"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="All">All Risk Tiers</MenuItem>
              <MenuItem value="Low Risk">Low Risk</MenuItem>
              <MenuItem value="Medium Risk">Medium Risk</MenuItem>
              <MenuItem value="High Risk">High Risk</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Prediction"
              value={predFilter}
              onChange={(e) => setPredFilter(e.target.value)}
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="All">All Outcomes</MenuItem>
              <MenuItem value="No Default">No Default</MenuItem>
              <MenuItem value="Default">Default</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="date_desc">Date (Newest First)</MenuItem>
              <MenuItem value="date_asc">Date (Oldest First)</MenuItem>
              <MenuItem value="prob_desc">Probability (Highest)</MenuItem>
              <MenuItem value="prob_asc">Probability (Lowest)</MenuItem>
            </TextField>
          </Stack>
        </Stack>

        {/* Main Records Presentation */}
        {filteredHistory.length === 0 ? (
          <EmptyState
            title={history.length === 0 ? 'No Prediction History Yet' : 'No Matching Search Results'}
            description={
              history.length === 0
                ? 'Submit applicant loan details on the Risk Assessment page to log assessments here.'
                : 'Try adjusting your search criteria or clearing filter dropdowns.'
            }
            actionText={history.length === 0 ? 'Make First Prediction' : null}
            actionPath="/predict"
          />
        ) : !isMobile ? (
          /* Desktop Data Table */
          <TableContainer sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px' }}>
            <Table size="medium">
              <TableHead sx={{ backgroundColor: 'rgba(7, 10, 19, 0.8)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8' }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8' }}>Verdict</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8' }}>Risk Tier</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8' }}>Default Prob.</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8' }}>Model</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: '#94a3b8' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.map((item) => {
                  const res = item.result || {};
                  const probPct = (res.default_probability * 100).toFixed(1);
                  const chipColor = getRiskChipColor(res.risk_level);
                  const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';

                  return (
                    <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.88rem' }}>
                        {dateStr}
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: res.prediction === 1 ? '#f43f5e' : '#34d399' }}>
                          {res.prediction_label || (res.prediction === 1 ? 'Default' : 'No Default')}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={res.risk_level || 'Low Risk'}
                          size="small"
                          sx={{
                            backgroundColor: chipColor.bg,
                            color: chipColor.color,
                            border: `1px solid ${chipColor.border}`,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ fontWeight: 700, color: '#ffffff' }}>
                        {probPct}%
                      </TableCell>

                      <TableCell sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                        {res.model || 'Logistic Regression'}
                      </TableCell>

                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="View Complete Record">
                            <IconButton size="small" color="primary" onClick={() => onViewRecord(item)}>
                              <VisibilityOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Record">
                            <IconButton size="small" color="error" onClick={() => onDeleteRecord(item.id)}>
                              <DeleteOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          /* Mobile Card List View */
          <Stack spacing={2}>
            {filteredHistory.map((item) => {
              const res = item.result || {};
              const probPct = (res.default_probability * 100).toFixed(1);
              const chipColor = getRiskChipColor(res.risk_level);
              const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A';

              return (
                <Card key={item.id} sx={{ p: 2, backgroundColor: 'rgba(7, 10, 19, 0.7)' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>{dateStr}</Typography>
                      <Typography variant="h6" sx={{ color: res.prediction === 1 ? '#f43f5e' : '#34d399', fontWeight: 700 }}>
                        {res.prediction_label}
                      </Typography>
                    </Box>
                    <Chip label={res.risk_level} size="small" sx={{ backgroundColor: chipColor.bg, color: chipColor.color, border: `1px solid ${chipColor.border}`, fontWeight: 700 }} />
                  </Stack>

                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>Default Probability</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: '#ffffff' }}>{probPct}%</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>Model</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#cbd5e1' }}>{res.model || 'Logistic Regression'}</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    <Button size="small" variant="outlined" startIcon={<VisibilityOutlinedIcon />} onClick={() => onViewRecord(item)}>
                      Details
                    </Button>
                    <Button size="small" variant="outlined" color="error" startIcon={<DeleteOutlinedIcon />} onClick={() => onDeleteRecord(item.id)}>
                      Delete
                    </Button>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryTable;
