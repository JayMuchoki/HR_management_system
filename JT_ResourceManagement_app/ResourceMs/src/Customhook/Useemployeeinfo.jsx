import { useEffect, useState } from 'react';
import axios from 'axios';

const useEmployeeInfo = () => {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getInfo = async () => {
      try {
        const result = await axios.get('http://localhost:3000/employee/getemployeeinfo', {
          cancelToken: source.token,
          withCredentials: true
        });
        if (result.data.Status) {
          setEmployeeInfo(result.data.Result[0]);
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch canceled:", err.message);
        } else {
          console.error(err);
          setError("An error occurred while fetching employee info.");
        }
      } finally {
        setLoading(false);
      }
    };

    getInfo();
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);

  return { employeeInfo, loading, error };
};

export default useEmployeeInfo;
