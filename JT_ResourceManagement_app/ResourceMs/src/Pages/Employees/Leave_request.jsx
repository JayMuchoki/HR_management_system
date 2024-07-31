import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useEmployeeInfo from "../../Customhook/Useemployeeinfo";

const LeaveRequest = () => {
  const { employeeInfo, loading: infoLoading, error: infoError } = useEmployeeInfo();

  const [values, setValues] = useState({
    name: '',
    email: '',
    startdate: '',
    enddate: '',
    reason: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize form values with employee info once it is loaded
  useEffect(() => {
    if (employeeInfo) {
      setValues({
        ...values,
        name: employeeInfo.name || '',
        email: employeeInfo.email || '',
      });
    }
  }, [employeeInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await axios.post('http://localhost:3000/employee/leave_request', values);
      if (result.data.Status) {
        console.log(result.data.Result);
        navigate('/dashboardemployee/leave');
      } else {
        setError(result.data.Error);
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred while submitting request");
    } finally {
      setLoading(false);
    }
  };

  if (infoLoading) return <p>Loading employee info...</p>;
  if (infoError) return <p>{infoError}</p>;

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow w-50">
        <h3 className="text-center">Request For Leave</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="form-label"><strong>Name:</strong></label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={values.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="startdate" className="form-label"><strong>Start Date:</strong></label>
          <input
            id="startdate"
            type="date"
            name="startdate"
            className="form-control"
            value={values.startdate}
            onChange={handleChange}
            required
          />

          <label htmlFor="enddate" className="form-label"><strong>End Date:</strong></label>
          <input
            id="enddate"
            type="date"
            name="enddate"
            className="form-control"
            value={values.enddate}
            onChange={handleChange}
            required
          />

          <label htmlFor="reason" className="form-label"><strong>Reason:</strong></label>
          <textarea
            id="reason"
            name="reason"
            className="form-control"
            rows="5"
            placeholder="Enter Reason for the leave request"
            value={values.reason}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="btn btn-success w-100 mt-2" disabled={loading}>
            {loading ? "Requesting..." : "Request"}
          </button>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LeaveRequest;
