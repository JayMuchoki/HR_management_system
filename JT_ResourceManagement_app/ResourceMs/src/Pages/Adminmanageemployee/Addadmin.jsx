import axios from 'axios'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addadmin = () => {
const [error,setError]=useState(null)
const [loading,setloading]=useState(false)
const [admin,setadmin]=useState({
    name:"",
    email: "",
    password: "",
   
})
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setadmin({...admin,[name]:value})
    }


const navigate=useNavigate();

const  handleSubmit = async (e) =>{
    e.preventDefault();
    setloading(true)
    setError(null)

    try {
        const result=await axios.post('http://localhost:3000/auth/add_admin',admin)
        if(result.data.Status){
            console.log(result.data.Status)
            navigate('/dashboard/profile')
        }else{
            console.log(Error)
            alert(result.data.Error);
        }  
    } catch (error) {
        console.error(error);
        alert("An error occurred while adding the category.");  
    }
    finally{
        setloading(false)
    }
}

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="p-3 rounded w-50 border bg-light">
        <h2 className="text-center mb-4">Add admin</h2>
        <form className="row g-1" onSubmit={handleSubmit}>

        <div className="col-12">
                <label htmlFor="name" className="form-label">
                    <strong>Name:</strong>
                </label>
                <input
                    id="name"
                    type="name"
                    name="name"
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
                    placeholder="Enter password"
                    className="form-control rounded-0"
                   onChange={handlechange}
                    required
                />
            </div>
        
            <button type="submit" className="btn btn-success w-100 rounded-0 mt-3" disabled={loading}>
            {loading ? "Adding..." : "Add Admin"}
            </button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
   
    </div>
</div>
  )
}

export default Addadmin
