import { useState } from 'react';
import '../styles/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';


const EmployeeLogin = () => {
    const [error, setError] = useState(null);
    const [loading,setloading]=useState(false);
    const [values, setValues] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;  //  Axios sends cookies

    const handleChange = (e) => {
        const { name, value } = e.target;
       
        setValues({ ...values, [name]: value });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        setError(null);
        setloading(true);

        try {

            const result =await  axios.post('http://localhost:3000/employee/employee_login', values)
            console.log(result);
            if(result.data.loginstatus){
                localStorage.setItem("valid",true)
                navigate('/dashboardemployee');
                } else {
                    setError(result.data.Error);
                }
            
        } catch (error) {
            console.error(error)  
            setError('An error occurred. Please try again.'); 
        }
        finally{
            setloading(false);
        }

    };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 vw-100 loginpage'>
    <div className='p-3 rounded w-25 border loginform'>
        {error && <div className='text-warning'>{error}</div>}
        <h2>Employee Login Page</h2>
        <LoginForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
        />
    </div>
</div>
  )
}

export default EmployeeLogin
