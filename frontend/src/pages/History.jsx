import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Button, Stack, Chip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

import {
  getPredictionHistory,
  deletePredictionRecord,
  clearPredictionHistory,
  exportHistoryToCSV,
} from '../services/historyStorage';
import HistoryCharts from '../components/HistoryCharts';
import HistoryTable from '../components/HistoryTable';
import HistoryDetailsModal from '../components/HistoryDetailsModal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';

const History = () => {
  const [history, setHistory] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Dialog State
  const [deleteId, setDeleteId] = useState(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getPredictionHistory();
    setHistory(data);
  };

  // View Details Modal
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
  };

  // Single Item Delete Confirmation
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      const updated = deletePredictionRecord(deleteId);
      setHistory(updated);
      setDeleteId(null);
    }
  };

  // Clear All History Confirmation
  const handleConfirmClearAll = () => {
    const updated = clearPredictionHistory();
    setHistory(updated);
    setIsClearConfirmOpen(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    exportHistoryToCSV();
  };

  // Metrics calculation
  const totalCount = history.length;
  const defaultCount = history.filter((h) => h.result?.prediction === 1 || h.result?.prediction_label === 'Default').length;
  const noDefaultCount = totalCount - defaultCount;
  const highRiskCount = history.filter((h) => h.result?.risk_level === 'High Risk').length;
  const avgProbability = totalCount > 0
    ? (history.reduce((acc, h) => acc + (h.result?.default_probability || 0), 0) / totalCount) * 100
    : 0;

  return (
    <Box sx={{ minHeight: '90vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <Box sx={{ p: 1.2, borderRadius: '12px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex' }}>
              <HistoryIcon fontSize="medium" />
            </Box>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Prediction Audit History & Analytics
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ color: '#94a3b8' }}>
            Historical record of all performed loan default assessments, cohort distribution analytics, and regulatory exports.
          </Typography>
        </Box>

        {history.length === 0 ? (
          <EmptyState
            title="No Prediction History Found"
            description="You haven't generated any loan default predictions yet. Submit an applicant profile on the Risk Assessment page to view historical records, interactive analytics, and audit CSV exports."
            actionText="Start First Risk Assessment"
            actionPath="/predict"
          />
        ) : (
          <>
            {/* 5 SUMMARY KPI CARDS */}
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              {/* Total Predictions */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700 }}>
                      Total Assessments
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>
                      {totalCount}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 600 }}>
                      Logged Session Records
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* No Defaults */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700 }}>
                      Approved / Safe
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#34d399', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>
                      {noDefaultCount}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#34d399', fontWeight: 600 }}>
                      {totalCount > 0 ? `${((noDefaultCount / totalCount) * 100).toFixed(0)}% Approval Rate` : '0%'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Defaults */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700 }}>
                      Defaults Flagged
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#f43f5e', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>
                      {defaultCount}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#f43f5e', fontWeight: 600 }}>
                      {totalCount > 0 ? `${((defaultCount / totalCount) * 100).toFixed(0)}% of Cohort` : '0%'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* High Risk Cases */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700 }}>
                      High Risk Tiers
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#fb7185', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>
                      {highRiskCount}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#fb7185', fontWeight: 600 }}>
                      Requires Manual Review
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Average Default Probability */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700 }}>
                      Mean Probability
                    </Typography>
                    <Typography variant="h3" sx={{ color: '#38bdf8', fontWeight: 800, my: 0.5, fontFamily: "'Outfit', sans-serif" }}>
                      {avgProbability.toFixed(1)}%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 600 }}>
                      Cohort Average
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* ANALYTICS CHARTS */}
            <HistoryCharts history={history} />

            {/* AUDIT HISTORY TABLE */}
            <HistoryTable
              history={history}
              onViewRecord={handleViewRecord}
              onDeleteRecord={handleDeleteClick}
              onClearAll={() => setIsClearConfirmOpen(true)}
              onExportCSV={handleExportCSV}
            />
          </>
        )}

        {/* DETAILS MODAL */}
        <HistoryDetailsModal
          open={isDetailsOpen}
          record={selectedRecord}
          onClose={() => setIsDetailsOpen(false)}
        />

        {/* SINGLE DELETE CONFIRM DIALOG */}
        <ConfirmDialog
          open={Boolean(deleteId)}
          title="Delete Assessment Record?"
          content="Are you sure you want to remove this record from history? This action cannot be undone."
          confirmText="Delete Record"
          confirmColor="error"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />

        {/* CLEAR ALL CONFIRM DIALOG */}
        <ConfirmDialog
          open={isClearConfirmOpen}
          title="Clear Entire Prediction Audit History?"
          content="Are you sure you want to permanently clear all stored predictions? All session audit trails, analytics, and CSV exports will be reset."
          confirmText="Clear All History"
          confirmColor="error"
          onConfirm={handleConfirmClearAll}
          onCancel={() => setIsClearConfirmOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default History;
