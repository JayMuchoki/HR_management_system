import { useState } from 'react';
import axios from 'axios';

const useDeleteRequest = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleDelete = async (id, onSuccess) => {
    setLoading(true);
    setErrors(null);
    try {
      const result = await axios.delete(`http://localhost:3000/employee/delete_request/${id}`);
      if (result.data.Status) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setErrors(result.data.Error);
      }
    } catch (error) {
      console.error(error);
      setErrors('Unable to delete');
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, errors };
};

export default useDeleteRequest;
