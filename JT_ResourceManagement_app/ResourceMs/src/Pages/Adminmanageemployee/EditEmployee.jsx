import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams(); 

    const [category, setCategory] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        station: "",
        category_id: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create cancel token

        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await axios.get("http://localhost:3000/auth/category", {
                    cancelToken: source.token // Attach cancel token to fetch request
                });
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    setError(result.data.Error);
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Fetch canceled:", err.message);
                } else {
                    console.error(err);
                    setError('An error occurred while fetching the categories.');
                }
            } finally {
                setLoading(false);
            }
        };

        const fetchEmployee = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await axios.get('http://localhost:3000/auth/employee/' + id, {
                    cancelToken: source.token // Attach cancel token to fetch request
                });
                setEmployee({
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    station: result.data.Result[0].station,
                    salary: result.data.Result[0].salary,
                    category_id: result.data.Result[0].category_id,
                });
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Fetch canceled:", err.message);
                } else {
                    console.error(err);
                    setError('An error occurred while fetching the employee details.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchEmployee();

        //here i used it to Cleanup function to cancel ongoing requests if the component unmounts
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [id]); // Dependency array includes id the side effect to occur when precisely id is engaged

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await axios.put("http://localhost:3000/auth/edit_employee/" + id, employee);
            if (result.data.Status) {
                navigate("/dashboard/employee");
            } else {
                setError(result.data.Error);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while updating the employee.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-3 rounded w-50 border bg-light">
                <h2 className="text-center mb-4">Edit Employee</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">
                            <strong>Name:</strong>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={employee.name}
                            placeholder="Enter name"
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">
                            <strong>Email:</strong>
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={employee.email}
                            placeholder="Enter email"
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="salary" className="form-label">
                            <strong>Salary:</strong>
                        </label>
                        <input
                            id="salary"
                            type="number"
                            value={employee.salary}
                            placeholder="Enter salary"
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="station" className="form-label">
                            <strong>Station:</strong>
                        </label>
                        <input
                            id="station"
                            type="text"
                            value={employee.station}
                            placeholder="Enter station"
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setEmployee({ ...employee, station: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            <strong>Category:</strong>
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={employee.category_id} // Added value attribute
                            className="form-select"
                            onChange={(e) =>
                                setEmployee({ ...employee, category_id: e.target.value })
                            }
                            required
                        >
                            <option value="">Select a category</option>
                            {category.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0 mt-3" disabled={loading}>
                        {loading ? "Updating..." : "Edit Employee"}
                    </button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default EditEmployee;
