
import { Link, Outlet, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';

const Dashboard = () => {

  axios.defaults.withCredentials=true

  const navigate=useNavigate();


  
  const handlelogout=() =>{
    axios.get("http://localhost:3000/auth/log_out")
    .then(result =>{
      if(result.data.Status){
        localStorage.removeItem("valid")
        navigate("/")
      }
    })
  }
  return (
    <div className="d-flex">
      <div className="bg-dark text-white p-2 vh-100">
        <h2 className="text-center">
          <Link  className="text-white text-decoration-none">
            <i className="bi bi-house-door-fill me-2"></i>Resource MS
          </Link>
        </h2>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/dashboard/employee" className="nav-link text-white">
              <i className="bi bi-people-fill me-2"></i>Manage Employees
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/dashboard/manage_stock" className="nav-link text-white">
              <i className="bi bi-box-seam me-2"></i>Manage Stock
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/dashboard/category" className="nav-link text-white">
              <i className="bi bi-tags-fill me-2"></i>Category
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/dashboard/profile" className="nav-link text-white">
              <i className="bi bi-person-fill me-2"></i>Profile
            </Link>
            <li className="nav-item">
            <Link to="/dashboard/requests" className="nav-link text-white"  >
              <i className="bi bi-calendar-check me-2"></i>Leave Requests
            </Link>
          </li>
          </li> <li className="nav-item mb-2">
        <Link to="/dashboard/reports" className="nav-link text-white">
          <i className="bi bi-newspaper me-2"></i>Report/News
        </Link>
      </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white"  onClick={handlelogout}>
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

export default Dashboard