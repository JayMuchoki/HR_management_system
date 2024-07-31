import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [category, setCategory] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department:"",
        password: "",
        salary: "",
        station: "",
        category_id: "",
        image: null,
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

        fetchCategories();

        //here i used it to Cleanup function to cancel ongoing requests if the component unmounts
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", employee.name);
        formData.append("email", employee.email);
        formData.append("department", employee.department);
        formData.append("password", employee.password);
        formData.append("salary", employee.salary);
        formData.append("station", employee.station);
        formData.append("category_id", employee.category_id);
        formData.append("image", employee.image);

        try {
            const result = await axios.post("http://localhost:3000/auth/add_employee", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (result.data.Status) {
                navigate("/dashboard/employee");
            } else {
                setError(result.data.Error);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while adding the employee.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-3 rounded w-50 border bg-light">
                <h2 className="text-center mb-4">Add Employee</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">
                            <strong>Name:</strong>
                        </label>
                        <input
                            id="name"
                            type="text"
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
                            placeholder="Enter email"
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="col-12">
    <label htmlFor="department" className="form-label">
        <strong>Department:</strong>
    </label>
    <select
        id="department"
        className="form-select rounded-0"
        onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
        required
    >
        <option value="">Select department</option>
        <option value="Finance">Finance</option>
        <option value="IT">IT</option>
        <option value="Economics">Economics</option>
        <option value="Catering">Catering</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Customer Service">Customer Service</option>
    </select>
</div>
                    <div className="col-12">
                        <label htmlFor="password" className="form-label">
                            <strong>Password:</strong>
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setEmployee({ ...employee, password: e.target.value })
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
                    <div className="col-12">
                        <label htmlFor="image" className="form-label">
                            <strong>Image:</strong>
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setEmployee({ ...employee, image: e.target.files[0] })
                            }
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0 mt-3" disabled={loading}>
                        {loading ? "Adding..." : "Add Employee"}
                    </button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default AddEmployee;
