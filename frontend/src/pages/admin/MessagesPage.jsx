import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { Star, StarBorder, Delete } from '@mui/icons-material';

import { MESSAGE_STATUS } from '../../utils/constants';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { useMessagesData } from '../../hooks/admin/messages/useMessagesData';

const MessagesPage = () => {
  const {
    messages,
    status,
    starredOnly,
    selectedIds,
    allSelected,
    open,
    activeMessage,
    handleStatusChange,
    handleStarredOnlyChange,
    toggleSelect,
    toggleSelectAll,
    openMessage,
    closeDialog,
    changeStatus,
    toggleStar,
    deleteOne,
    bulkDelete,
    bulkMarkRead,
    badgeColor,
  } = useMessagesData();

  return (
    <>
      <Helmet>
        <title>Messages | Admin</title>
      </Helmet>

      <AdminPageHeader
        title="Messages"
        subtitle="View and manage contact messages."
      />

      {/* Filters + Bulk actions */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            label="Status"
            value={status}
            onChange={handleStatusChange}
            size="small"
          >
            {MESSAGE_STATUS.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={starredOnly}
                onChange={handleStarredOnlyChange}
              />
            }
            label="Starred only"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Button variant="outlined" size="small" onClick={toggleSelectAll}>
              {allSelected ? 'Unselect All' : 'Select All'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={bulkMarkRead}
              disabled={selectedIds.length === 0}
            >
              Mark Read
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={bulkDelete}
              disabled={selectedIds.length === 0}
            >
              Delete Selected
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Messages List */}
      <Grid container spacing={2}>
        {messages.map((m) => (
          <Grid item xs={12} key={m._id}>
            <Card className="card">
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {/* Row 1: Checkbox + Subject + From */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  <Checkbox
                    checked={selectedIds.includes(m._id)}
                    onChange={() => toggleSelect(m._id)}
                    sx={{ mt: -0.5 }}
                  />

                  <Box
                    sx={{ flex: 1, cursor: 'pointer' }}
                    onClick={() => openMessage(m._id)}
                  >
                    <Typography
                      sx={{
                        fontWeight: m.status === 'unread' ? 900 : 700,
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                      }}
                    >
                      {m.subject}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      }}
                    >
                      {m.name} — {m.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Row 2: Status + Star/Delete (responsive) */}
                <Box
                  sx={{
                    mt: 0.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Chip
                    size="small"
                    label={m.status}
                    color={badgeColor(m.status)}
                  />

                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => toggleStar(m._id)}
                    >
                      {m.isStarred ? (
                        <Star color="warning" />
                      ) : (
                        <StarBorder />
                      )}
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteOne(m._id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {messages.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No messages found.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Message Detail Dialog */}
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>Message</DialogTitle>
        <DialogContent dividers>
          {!activeMessage ? (
            <Typography color="text.secondary">Loading...</Typography>
          ) : (
            <>
              <Typography sx={{ fontWeight: 900 }}>
                {activeMessage.subject}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                From: {activeMessage.name} ({activeMessage.email})
              </Typography>
              <Typography color="text.secondary">
                Status: {activeMessage.status}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                  {activeMessage.message}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ flexWrap: 'wrap', gap: 1 }}>
          {activeMessage && (
            <>
              <Button
                size="small"
                onClick={() => changeStatus(activeMessage._id, 'read')}
              >
                Mark Read
              </Button>
              <Button
                size="small"
                onClick={() => changeStatus(activeMessage._id, 'replied')}
              >
                Mark Replied
              </Button>
              <Button
                size="small"
                onClick={() => changeStatus(activeMessage._id, 'archived')}
              >
                Archive
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => deleteOne(activeMessage._id)}
              >
                Delete
              </Button>
            </>
          )}
          <Button variant="contained" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessagesPage;