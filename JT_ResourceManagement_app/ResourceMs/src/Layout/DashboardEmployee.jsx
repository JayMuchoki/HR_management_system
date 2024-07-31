
import { Link, Outlet, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'



const DashBoardEmployee = () => {

  
  axios.defaults.withCredentials=true
  const navigate=useNavigate();

  const handlelogout=async ()=>{
    try {
      const result=await axios.get("http://localhost:3000/employee/log_out")
      if(result.data.Status){
        localStorage.removeItem("valid")
        navigate('/')
      }else{
        alert(result.data.Error)
      }
      
    } catch (error) {
      console.error(error)
      alert("Error occured while loggingout")
      
    }
  }


  return (
    <div className="d-flex">
      <div className="bg-dark text-white p-2 vh-100">
        <h2 className="text-center">
          <Link  className="text-white text-decoration-none">
            <i className="bi bi-house-door-fill me-2"></i>J&J Limited
          </Link>
        </h2>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <Link to={`/dashboardemployee`}  className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
        <Link to="/dashboardemployee/leave" className="nav-link text-white">
          <i className="bi bi-calendar2-check me-2"></i>Leave
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/dashboardemployee/edit_profile" className="nav-link text-white">
          <i className="bi bi-person-circle me-2"></i>Edit Profile
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/dashboardemployee/employeereports" className="nav-link text-white">
          <i className="bi bi-newspaper me-2"></i>Report/News
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/dashboardemployee" className="nav-link text-white"  onClick={handlelogout}>
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </Link>
      </li>
         
             </ul>
      </div>
      <div className="flex-grow-1 p-3">
       

        <Outlet/> 
      </div>
    </div>
  )
}

export default DashBoardEmployee
