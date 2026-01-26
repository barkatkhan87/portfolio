import { useEffect, useState } from 'react';
import { messageApi } from '../../../api/messageApi';

export const useMessagesData = () => {
  const [data, setData] = useState({
    messages: [],
    counts: {},
    pagination: {},
  });
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
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected =
    selectedIds.length === messages.length && messages.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(messages.map((m) => m._id));
  };

  const openMessage = async (id) => {
    const res = await messageApi.getById(id); // backend auto marks read
    setActiveMessage(res.data);
    setOpen(true);
    await load();
  };

  const closeDialog = () => {
    setOpen(false);
    setActiveMessage(null);
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
    if (!window.confirm('Delete this message?')) return;
    await messageApi.delete(id);
    await load();
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) {
      window.alert('Select messages first');
      return;
    }
    if (!window.confirm(`Delete ${selectedIds.length} message(s)?`)) return;
    await messageApi.deleteMultiple(selectedIds);
    await load();
  };

  const bulkMarkRead = async () => {
    if (selectedIds.length === 0) {
      window.alert('Select messages first');
      return;
    }
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

  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleStarredOnlyChange = (event) =>
    setStarredOnly(event.target.checked);

  return {
    data,
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
  };
};