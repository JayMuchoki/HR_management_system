import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createreport = () => {
    const [report,setreport]=useState('');
    const [error,seterror]=useState(null)
    const [loading,setloading]=useState(false)
    const navigate=useNavigate();

    const handlesubmit=async (e)=>{
        e.preventDefault();
        seterror(null)
        setloading(true)
        try {
            const result=await axios.post("http://localhost:3000/auth/create_report",{report})
            if(result.data.Status){
                console.log(result.data.Result)
                navigate("/dashboard/reports")
                

            }else{
                seterror(result.data.Error)
            }
            
        } catch (error) {
            console.error(error)
            seterror("Issue posting an Agenda")
            
        }
        finally{
            setloading(false)
        }
    }
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="d-flex flex-column mb-2">
        <label htmlFor="description"><strong>Agenda:</strong></label>
        <textarea 
        name="description" 
        id="description"
        rows={10}
        cols={33}
        value={report}
        onChange={(e)=> setreport(e.target.value)}
        required
        placeholder="Enter News or Event to Post"
        ></textarea>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
            {loading? "Posting...":"Posting Agenda"}
        </button>
      </form>
    </div>
  );
};

export default Createreport;
