import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditReport = () => {
    const [report, setreport] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(()=>{


        const adminvalues=async ()=>{
          setError(null)
          setLoading(true)
          try {
            const result=await axios.get('http://localhost:3000/auth/report/'+id)
            if(result.data.Status){
             console.log(result.data.Result)

            setreport(result.data.Result[0].report)
      
            }else{
              setError(result.data.Error)
            }
          } catch (error) {
            console.error(error)
            alert("An error occurred while fetching this admin.");  
      
            
          }finally{
            setLoading(false)
        }
        }
      
        adminvalues()
      },[id])
      
      const handlesubmit= async (e)=>{
        e.preventDefault();
        setError(null)
        setLoading(true)
      try {
        const result=await axios.put("http://localhost:3000/auth/edit_report/"+id,{report})
      
        if(result.data.Status){
          console.log(result.data.Result)
          navigate("/dashboard/reports")
      
        }else{
          setError(result.data.Error)
        }
        
      } catch (error) {
        console.error(error)
        alert("Issue while editing")
        
      }finally{
        setLoading(false)
      }
      
       }
      if (loading) return <p>Loading...</p>
      if (error) return <p>{error}</p>
   
    return (
        <div>
        <form  onSubmit={handlesubmit}>
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

export default EditReport;
