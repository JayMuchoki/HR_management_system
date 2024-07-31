import axios from "axios"
import { useEffect, useState } from "react"



const Editprofile = () => {
    
  const [error,setError]=useState(null)
  const [loading,setloading]=useState(false)
const [userdetail,setuserdetail]=useState({
  name:"",
  email:"",
  password:""
})




useEffect(() => {
    const source = axios.CancelToken.source();

    const getInfo = async () => {
      try {
        const result = await axios.get('http://localhost:3000/employee/getemployeeinfo', {
          cancelToken: source.token,
          withCredentials: true // Include credentials with the request
        });
        if (result.data.Status) {
          console.log(result.data.Result)
          setuserdetail(result.data.Result[0]);
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch canceled:", err.message);
        } else {
          console.error(err);
          setError("An error occurred while fetching admin info.");
        }
      } finally {
        setloading(false); // Set loading to false regardless of success or error
      }
    };

    getInfo();
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);



 const handlechange=(e)=>{
  const {name,value}=e.target;
  setuserdetail({...userdetail,[name]:value})
 }

 const handlesubmit= async (e)=>{
  e.preventDefault();
  setError(null)
  setloading(true)
try {
  const result=await axios.put("http://localhost:3000/employee/edit_user",userdetail)

  if(result.data.Status){
    console.log(result.data.Result)
    alert("Profile Edited successfully")

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
                <h2 className="text-center mb-4">Edit User Profile</h2>
                <form className="row g-1"  onSubmit={handlesubmit} >
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">
                            <strong>Name:</strong>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={userdetail.name}
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
                            value={userdetail.email}
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
                            value={userdetail.password}
                            placeholder="Enter password"
                            className="form-control rounded-0"
                            onChange={handlechange}
                            required
                        />
                    </div>
                    
                    
                   
                    <button type="submit" className="btn btn-success w-100 rounded-0 mt-3 " disabled={loading}>
                    {loading ? "Editing..." : "Edit Profile"}
                    </button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
           
            </div>
        </div>
  )
}

export default Editprofile
