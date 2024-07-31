import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditRequest = () => {
  const [error,setError]=useState(null)
  const [loading,setloading]=useState(false)

  const [values, setValues] = useState({
    name: '',
    email: '',
    startdate: '',
    enddate: '',
    reason: ''
  });
  const {id}=useParams();
  const navigate=useNavigate();


  useEffect(()=>{


    const adminvalues=async ()=>{
      setError(null)
      setloading(true)
      try {
        const result=await axios.get('http://localhost:3000/employee/request/'+id)
        if(result.data.Status){
         console.log(result.data.Result)
         setValues({...values,
          name:result.data.Result[0].name,
          email:result.data.Result[0].email,
         reason:result.data.Result[0].reason
         })
  
        }else{
          setError(result.data.Error)
        }
      } catch (error) {
        console.error(error)
        alert("An error occurred while fetching this admin.");  
  
        
      }finally{
        setloading(false)
    }
    }
  
    adminvalues()
  },[id])

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setValues({...values,[name]:value})
   }
  
   const handleSubmit= async (e)=>{
    e.preventDefault();
    setError(null)
    setloading(true)
  try {
    const result=await axios.put("http://localhost:3000/employee/edit_request/"+id,values)
  
    if(result.data.Status){
      console.log(result.data.Result)
      navigate('/dashboardemployee/leave')
      
    }else{
      setError(result.data.Error)
    }
    
  } catch (error) {
    console.error(error)
    alert("Issue while editing")
    
  }finally{
    setloading(false)
  }
  
   }
  
  
   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow w-50">
        <h3 className="text-center">Edit Request For Leave</h3>
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
            
            onChange={handleChange}
            required
          />

          <label htmlFor="enddate" className="form-label"><strong>End Date:</strong></label>
          <input
            id="enddate"
            type="date"
            name="enddate"
            className="form-control"
            
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
    </div>
  )
}

export default EditRequest
