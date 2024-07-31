import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



const Editadmin = () => {

  const {id}=useParams()
  const [error,setError]=useState(null)
  const [loading,setloading]=useState(false)
const [admin,setadmin]=useState({
  name:"",
  email:"",
  password:""
})

const navigate=useNavigate();


useEffect(()=>{


  const adminvalues=async ()=>{
    setError(null)
    setloading(true)
    try {
      const result=await axios.get('http://localhost:3000/auth/admin/'+id)
      if(result.data.Status){
       console.log(result.data.Result)
       setadmin({...admin,
        name:result.data.Result[0].name,
        email:result.data.Result[0].email,
        password:result.data.Result[0].password
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



 const handlechange=(e)=>{
  const {name,value}=e.target;
  setadmin({...admin,[name]:value})
 }

 const handlesubmit= async (e)=>{
  e.preventDefault();
  setError(null)
  setloading(true)
try {
  const result=await axios.put("http://localhost:3000/auth/edit_admin/"+id,admin)

  if(result.data.Status){
    console.log(result.data.Result)
    navigate("/dashboard/profile")

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
    <div className="d-flex justify-content-center align-items-center vh-100">
      
            <div className="p-3 rounded w-50 border bg-light">
                <h2 className="text-center mb-4">Edit Admin</h2>
                <form className="row g-1"  onSubmit={handlesubmit} >
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">
                            <strong>Name:</strong>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={admin.name}
                            placeholder="Enter name"
                            className="form-control rounded-0"
                            onChange={handlechange}
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
                          name="email"
                            value={admin.email}
                            placeholder="Enter email"
                            className="form-control rounded-0"
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="password" className="form-label">
                            <strong>Password:</strong>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={admin.password}
                            placeholder="Enter password"
                            className="form-control rounded-0"
                            onChange={handlechange}
                            required
                        />
                    </div>
                    
                    
                   
                    <button type="submit" className="btn btn-success w-100 rounded-0 mt-3 " disabled={loading}>
                    {loading ? "Editing..." : "Edit Admin"}
                    </button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
           
            </div>
        </div>
  )
}

export default Editadmin
