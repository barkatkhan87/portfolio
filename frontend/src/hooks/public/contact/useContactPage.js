import { useState } from 'react';
import { messageApi } from '../../../api/messageApi';

export const useContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await messageApi.send(values);
      // You can add a toast/notification here if desired
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};