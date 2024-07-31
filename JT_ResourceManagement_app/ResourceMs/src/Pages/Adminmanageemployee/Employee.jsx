import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false); 
  const [error, setError] = useState(null);
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await axios.get("http://localhost:3000/auth/employee", {
          cancelToken: source.token,
        });
        if (result.data.Status) {
          setEmployees(result.data.Result);
          setFilteredEmployees(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch canceled:", err.message);
        } else {
          console.error(err);
          setError("An error occurred while fetching the employees.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    setSearchValue('');
    setFilteredEmployees(employees); // Reset filtered employees when changing category
  };

  const handleSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    let filtered;
    switch (searchCategory) {
      case 'department':
        filtered = employees.filter(emp => emp.department.toLowerCase().includes(value.toLowerCase()));
        break;
      case 'email':
        filtered = employees.filter(emp => emp.email.toLowerCase().includes(value.toLowerCase()));
        break; 
       
      case 'salary':
       
        filtered = employees.filter(emp => emp.salary >= parseInt(value));
        break;
        case 'station':
          filtered = employees.filter(emp => emp.station.toLowerCase().includes(value.toLowerCase()));
          break;
      default:
        filtered = employees;
        break;
    }
    setFilteredEmployees(filtered);
  };

  const handleDelete = async (id) => {
    setError(null);
    setDeleting(true);
    try {
      const result = await axios.delete(`http://localhost:3000/auth/delete_employee/${id}`);
      if (result.data.Status) {
        setEmployees((prevEmployees) => prevEmployees.filter((e) => e.id !== id));
        setFilteredEmployees((prevFiltered) => prevFiltered.filter((e) => e.id !== id));
      } else {
        alert(result.data.Status);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting an employee.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link className="btn btn-success me-3" to="/dashboard/add_employee">
        Add Employee
      </Link>
      <Link className="btn btn-success " to="/dashboard/add_admin">
        Add an Admin
      </Link>

      <div className="mt-3">
        <div className="row mb-3 justify-content-end">
          <div className="col-md-3">
            <label htmlFor="searchCategory">Select Category:</label>
            <select id="searchCategory" className="form-select" value={searchCategory} onChange={handleSearchCategoryChange}>
              <option value="all">All</option>
              <option value="department">Department</option>
              <option value="email">Email</option>
              <option value="salary">Salary</option>
              <option value="station">Station</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="searchValue">Search:</label>
            <input
              id="searchValue"
              className="form-control"
              type="text"
              value={searchValue}
              onChange={handleSearchValueChange}
              placeholder={`Enter ${searchCategory}`}
            />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Station</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/images/${e.image}`}
                    alt=""
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.salary}</td>
                <td>{e.station}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    disabled={deleting}
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
