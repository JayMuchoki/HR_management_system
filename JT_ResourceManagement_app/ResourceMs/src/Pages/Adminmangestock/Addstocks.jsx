import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addstocks = () => {
  const [values, setValues] = useState({
    item: "",
    stockin: "",
    stockout: "",
    allocated:"",
    remainingstock: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:3000/stock/add_stock", values);
      console.log(result.data.status);
      if (result.data.status) {
        navigate("/dashboard/manage_stock");
      } else {
        setError(result.data.Error);
      }
    } catch (error) {
      console.error(error);
      setError("Currently unable to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-50 border bg-light">
        {error && <div className='text-warning'>{error}</div>}
        <h2 className="text-center mb-4">Add Stock Items</h2>
        <form onSubmit={handleSubmitForm} className="row g-1">
          <div className="col-12">
            <label htmlFor="item" className="form-label">
              <strong>Item:</strong>
            </label>
            <input
              id="item"
              name="item"
              type="text"
              placeholder="Enter item"
              className="form-control rounded-0"
              onChange={handleChange}
              value={values.item}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="stockin" className="form-label">
              <strong>Stocks in:</strong>
            </label>
            <input
              id="stockin"
              name="stockin"
              type="text"
              placeholder="Enter Stocks in"
              className="form-control rounded-0"
              onChange={handleChange}
              value={values.stockin}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="stockout" className="form-label">
              <strong>Stocks out:</strong>
            </label>
            <input
              id="stockout"
              name="stockout"
              type="text"
              placeholder="Enter Stocks out"
              className="form-control rounded-0"
              onChange={handleChange}
              value={values.stockout}
              required
            />
            </div>
            <div className="col-12">
            <label htmlFor="allocated" className="form-label">
              <strong>Allocated Department:</strong>
            </label>
            <input
              id="allocated"
              name="allocated"
              type="text"
              placeholder="Enter To which department allocated?"
              className="form-control rounded-0"
              onChange={handleChange}
              value={values.allocated}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="remainingstock" className="form-label">
              <strong>Remaining Stock:</strong>
            </label>
            <input
              id="remainingstock"
              name="remainingstock"
              type="text"
              placeholder="Enter Remaining Stock"
              className="form-control rounded-0"
              onChange={handleChange}
              value={values.remainingstock}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0 mt-3" disabled={loading}>
            {loading ? "Adding ..." : "Add stock"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addstocks;
