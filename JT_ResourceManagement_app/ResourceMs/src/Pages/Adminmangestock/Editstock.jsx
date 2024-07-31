import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editstock = () => {
  const [values, setValues] = useState({
    item: "",
    stockin: "",
    stockout: "",
    allocated:"",
    remainingstock: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {id}=useParams();
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const fetchItem = async () => {
      setError(null);
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:3000/stock/stockitem/`+id);
        console.log('Fetch result:', result); // Log the result for debugging
        if (result.data.Status) {
          setValues({...values,
            item: result.data.Result[0].item,
            stockin: result.data.Result[0].stockin,
            stockout: result.data.Result[0].stockout,
            allocated: result.data.Result[0].allocated,
            remainingstock: result.data.Result[0].remainingstock
          });
        } else {
          setError(result.data.Error);
        }
      } catch (error) {
        console.error('Fetch error:', error); // Log the error for debugging
        alert('Failed to fetch item data.');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);


  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError(null)
    setLoading(false)
    try {
        const result=await axios.put("http://localhost:3000/stock/edit_stock/"+id,values)
        if(result.data.Status){
            console.log(result.data.Result)
            navigate('/dashboard/manage_stock')
            
        }else{
            setError(result.data.Error)
        }
    } catch (error) {
        console.error('Fetch error:', error); 
        alert('Failed to fetch item data.');
    }
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-50 border bg-light">
        {error && <div className='text-warning'>{error}</div>}
        <h2 className="text-center mb-4">Edit Stock Item</h2>
        <form onSubmit={handleSubmitForm} className="row g-1">
          <div className="col-12">
            <label htmlFor="item" className="form-label">
              <strong>Item:</strong>
            </label>
            <input
              id="item"
              name="item"
              type="text"
              value={values.item}
              placeholder="Enter item"
              className="form-control rounded-0"
              onChange={handleChange}
              
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
              value={values.stockin}
              placeholder="Enter Stocks in"
              className="form-control rounded-0"
              onChange={handleChange}
              
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
              value={values.stockout}
              placeholder="Enter Stocks out"
              className="form-control rounded-0"
              onChange={handleChange}
              
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
            {loading ? "Adding ..." : "Edit stock"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editstock;