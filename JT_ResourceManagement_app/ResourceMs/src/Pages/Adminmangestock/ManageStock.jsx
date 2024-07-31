import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageStock = () => {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [searchvalue,setsearchvalue]=useState('')
  const [filtereditems,setfiltereditems]=useState([])
  const [deleting,setdeleting]=useState(false)

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchItems = async () => {
      setError(null);
      setLoading(true); 

      try {
        const result = await axios.get("http://localhost:3000/stock/manage_stock", {
          cancelToken: source.token,
        });
        if (result.data.status) {
          setStock(result.data.Result);
          setfiltereditems(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
          setError("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    return () => {
      source.cancel("Operation has been canceled");
    };
  }, []);

const handlesearchchange=(e)=>{
  const value=e.target.value;
  setsearchvalue(value)

  const  filtered=stock.filter((f) => f.item.toLowerCase().includes(value.toLowerCase()))

  setfiltereditems(filtered)
}

const handledelete=async (id)=>{
  setError(null)
  setdeleting(true)
  try {
    const result=await axios.delete("http://localhost:3000/stock/delete_item/"+id)
    if(result.data.Status){
      window.location.reload()
    }else{
      setError(result.data.Status)
    }
  } catch (error) {
    console.error(error)
    alert("Delete process failed")
  }
  finally{
    setdeleting(false)
  }
}


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Stocks Inventory</h3>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="border border-black px-2 py-2 rounded">Total Items: {stock.length}</p>
        <Link to={'/dashboard/add_stocks'} className="btn btn-success">Add Item</Link>
      </div>
      <div className="d-flex justify-content-end">
          <input
           type="text"
           className="border-box rounded-2"
           placeholder="search item"
           value={searchvalue}
           onChange={handlesearchchange}
          
          />
      </div>
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-secondary text-white">
            <tr>
              <th scope="col">Items</th>
              <th scope="col">Opening Stock</th>
              <th scope="col">Total Stock Out</th>
              <th scope="col">Allocated Department</th>
              <th scope="col">Remaining Stock</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtereditems.map((s) => (
              <tr key={s.id}>
                <td>{s.item}</td>
                <td>{s.stockin}</td>
                <td>{s.stockout}</td>
                <td>{s.allocated}</td>
                <td>{s.remainingstock}</td>
                <td>
                  <Link to={'/dashboard/edit_stock/'+s.id} className="btn btn-primary btn-sm me-3">Edit</Link>
                  <button className="btn btn-danger btn-sm" 
                  onClick={()=>handledelete(s.id)}
                  disabled={deleting}>  
                  {deleting?"Deleting Item":"Delete"}
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

export default ManageStock;
