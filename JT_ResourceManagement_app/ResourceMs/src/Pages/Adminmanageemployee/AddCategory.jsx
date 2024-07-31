import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await axios.post("http://localhost:3000/auth/add_category", { category });
            if (result.data.Status) {
                navigate("/dashboard/category");
            } else {
                alert(result.data.Error);
                setError(result.data.Error);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while adding the category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex ">
    <div className="p-3 rounded w-45 border bg-light mt-5 ms-5">
        <form  onSubmit={handleSubmit} className="column" >
            <div className="form-group ">
                <label htmlFor="category"><strong>Category:</strong></label>
                <input
                    type="text"
                    id="category"
                    className="form-control"
                    value={category}
                    placeholder="Enter category"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
                {loading ? "Adding..." : "Add Category"}
            </button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
        </div>
</div>
    );
};

export default AddCategory;
