import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


const Profile = () => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleting,setdeleting]=useState(false)

  useEffect(() => {
    const source = axios.CancelToken.source(); 

    const fetchAdmins = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await axios.get('http://localhost:3000/auth/profile', {
          cancelToken: source.token, 
        });
        if (result.data.Status) {
          setAdminList(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch canceled:", err.message);
        } else {
          console.error(err);
          setError("An error occurred while fetching the admin list.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();

    
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []); // Empty array ensures the effect runs only once after the initial render

const handleDelete=async (id)=>{
setdeleting(true)
setError(null)
  try {
    const result=await axios.delete("http://localhost:3000/auth/delete_admin/"+id)
    if(result.data.Status){
      window.location.reload()

    }else{
      setError(result.data.Error)
    }
    
  } catch (error) {
    console.error(error)
    alert("unable to delete")
    
  }
  finally{
    setdeleting(false)
  }
}
  

  if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
  return (
    <div className='px-5 mt-3'>
    <div className='d-flex flex-column '>
    <Link className="btn btn-success col-3 mb-3" to="/dashboard/add_admin">
        Add an Admin
      </Link>
        <h3>List Of Admins</h3>
    </div>

    <div className='mt-3'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {adminList.map((c) => (
                    <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        
                        <td>
                        <Link to={'/dashboard/edit_admin/'+c.id} className='btn btn-success ms-6 btn-sm me-2'>edit</Link>
                        <button
                    disabled={deleting}
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default Profile
