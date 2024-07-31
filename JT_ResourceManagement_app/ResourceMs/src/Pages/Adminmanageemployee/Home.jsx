import axios from 'axios';
import { useEffect, useState } from 'react';
import adminimg from "../../assets/images/admin.jpg"

const Home = () => {
  const [employeeinfo, setEmployeeinfo] = useState({});
  const [employeetotal, setEmployeeTotal] = useState(0);
  const [salarytotal, setSalaryTotal] = useState(0);
  const [stocktotal,setstocktotal]=useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {

    const source=axios.CancelToken.source()

    const  getinfo=async ()=>{
     try {
      const result=await  axios.get('http://localhost:3000/auth/admin_info',{
        CancelToken:source.token
      }) 
      if(result.data.Status){
        console.log(result.data.Result)
        setEmployeeinfo(result.data.Result[0])
      }else {
        setError(result.data.Error);
      }
      
     } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Fetch canceled:", err.message);
      } else {
        console.error(err);
        setError("An error occurred while fetching admin count.");
      }
     }
    };

    const employeeCount = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/employee_count", {
          cancelToken: source.token, 
        });
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch canceled:", err.message);
        } else {
          console.error(err);
          setError("An error occurred while fetching employee count.");
        }
      }
    };
    const salaryCount = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/salary_count", {
          cancelToken: source.token
        });
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].totalsalary);//totalsalary is where i said select sum(salary) as totalsalary
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch canceled:", err.message);
        } else {
          console.error(err);
          setError("An error occurred while fetching salary count.");
        }
      }
    };

    const stockcount=async ()=>{
      try {
        const result=await axios.get("http://localhost:3000/auth/stock_count")
        if(result.data.Result){
          setstocktotal(result.data.Result[0].totalstock)
        }else{
          setError(result.data.Error)
        }
        
      } catch (err) {
        if(axios.isCancel(error)){
          console.log("Fetched canceled:",error.message)
        }else{
          console.error(err);
          setError("An error occurred while fetching salary count.");
        }
        
      }
    }

    setLoading(true);
    setError(null);
    Promise.all([ getinfo(),stockcount(), employeeCount(), salaryCount()])
      .finally(() => setLoading(false));

    
    return () => {
      source.cancel("Operation canceled by the user.");
    };



  
      
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='bg-lightblue d-flex flex-column'> 
      <div className='d-flex align-items-center p-4 bg-light rounded shadow-sm'>
  <img src={adminimg} alt="Admin" className='adminimage rounded-circle mr-3'  />
  <div>
    <h1 className='font-italic text-primary mb-5'>Welcome, {employeeinfo.name}</h1>
    <h5 className='mt-3 text-muted'>You are an admin</h5>
  </div>
</div>

<div className="p-3 d-flex justify-content-between mt-3">
<div className="px-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Stocks</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between ">
            <h5>Stocks Available:</h5>
            <h5>{loading ? "Loading..." : stocktotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employees</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between ">
            <h5>Total Employees:</h5>
            <h5>{loading ? "Loading..." : employeetotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between ">
            <h5>Total Salary:</h5>
            <h5>{loading ? "Loading..." : salarytotal}</h5>
          </div>
          
        </div>
        

      </div>
      
    </div>
  );
};

export default Home;
