import { useEffect, useMemo, useState } from 'react';
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
} from '@mui/material';
import { Star, StarBorder, Delete } from '@mui/icons-material';
import { messageApi } from '../../api/messageApi';
import { MESSAGE_STATUS } from '../../utils/constants';

const MessagesPage = () => {
  const [data, setData] = useState({ messages: [], counts: {}, pagination: {} });
  const [status, setStatus] = useState('all');
  const [starredOnly, setStarredOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);

  const load = async () => {
    const params = {
      status,
      ...(starredOnly ? { starred: 'true' } : {}),
      page: 1,
      limit: 50,
      sort: '-createdAt',
    };
    const res = await messageApi.getAll(params);
    setData(res.data);
    setSelectedIds([]);
  };

  useEffect(() => {
    load();
  }, [status, starredOnly]);

  const messages = data.messages || [];

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const allSelected = useMemo(() => selectedIds.length === messages.length && messages.length > 0, [selectedIds, messages]);
  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(messages.map((m) => m._id));
  };

  const openMessage = async (id) => {
    const res = await messageApi.getById(id); // backend auto marks read if unread
    setActiveMessage(res.data);
    setOpen(true);
    await load();
  };

  const changeStatus = async (id, newStatus) => {
    await messageApi.updateStatus(id, newStatus);
    await load();
  };

  const toggleStar = async (id) => {
    await messageApi.toggleStar(id);
    await load();
  };

  const deleteOne = async (id) => {
    if (!confirm('Delete this message?')) return;
    await messageApi.delete(id);
    await load();
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return alert('Select messages first');
    if (!confirm(`Delete ${selectedIds.length} message(s)?`)) return;
    await messageApi.deleteMultiple(selectedIds);
    await load();
  };

  const bulkMarkRead = async () => {
    if (selectedIds.length === 0) return alert('Select messages first');
    await messageApi.markAsRead(selectedIds);
    await load();
  };

  const badgeColor = (s) => {
    if (s === 'unread') return 'error';
    if (s === 'read') return 'default';
    if (s === 'replied') return 'success';
    if (s === 'archived') return 'warning';
    return 'default';
  };

  return (
    <>
      <Helmet><title>Messages | Admin</title></Helmet>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Messages</Typography>
        <Typography color="text.secondary">View and manage contact messages.</Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {MESSAGE_STATUS.map((s) => (
              <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={<Checkbox checked={starredOnly} onChange={(e) => setStarredOnly(e.target.checked)} />}
            label="Starred only"
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Button variant="outlined" onClick={toggleSelectAll}>
            {allSelected ? 'Unselect All' : 'Select All'}
          </Button>
          <Button variant="outlined" onClick={bulkMarkRead} disabled={selectedIds.length === 0}>
            Mark Read
          </Button>
          <Button variant="contained" color="error" onClick={bulkDelete} disabled={selectedIds.length === 0}>
            Delete Selected
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {messages.map((m) => (
          <Grid item xs={12} key={m._id}>
            <Card className="card">
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Checkbox checked={selectedIds.includes(m._id)} onChange={() => toggleSelect(m._id)} />

                <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => openMessage(m._id)}>
                  <Typography sx={{ fontWeight: m.status === 'unread' ? 900 : 700 }}>
                    {m.subject}
                  </Typography>
                  <Typography color="text.secondary">
                    {m.name} — {m.email}
                  </Typography>
                </Box>

                <Chip size="small" label={m.status} color={badgeColor(m.status)} />

                <IconButton onClick={() => toggleStar(m._id)}>
                  {m.isStarred ? <Star color="warning" /> : <StarBorder />}
                </IconButton>

                <IconButton onClick={() => deleteOne(m._id)} color="error">
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {messages.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">No messages found.</Typography>
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Message</DialogTitle>
        <DialogContent dividers>
          {!activeMessage ? (
            <Typography color="text.secondary">Loading...</Typography>
          ) : (
            <>
              <Typography sx={{ fontWeight: 900 }}>{activeMessage.subject}</Typography>
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
        <DialogActions>
          {activeMessage && (
            <>
              <Button onClick={() => changeStatus(activeMessage._id, 'read')}>Mark Read</Button>
              <Button onClick={() => changeStatus(activeMessage._id, 'replied')}>Mark Replied</Button>
              <Button onClick={() => changeStatus(activeMessage._id, 'archived')}>Archive</Button>
              <Button color="error" onClick={() => deleteOne(activeMessage._id)}>Delete</Button>
            </>
          )}
          <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessagesPage;