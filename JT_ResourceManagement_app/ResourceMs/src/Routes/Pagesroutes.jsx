
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from '../Layout/Dashboard';
import Profile from '../Pages/Adminmanageemployee/Profile';
import Category from '../Pages/Adminmanageemployee/Category';
import Employee from '../Pages/Adminmanageemployee/Employee';
import Home from '../Pages/Adminmanageemployee/Home';
import AddCategory from '../Pages/Adminmanageemployee/AddCategory';
import AddEmployee from '../Pages/Adminmanageemployee/AddEmployee';
import AdminLogin from '../Layout/AdminLogin';
import Addadmin from '../Pages/Adminmanageemployee/Addadmin';
import EditEmployee from '../Pages/Adminmanageemployee/EditEmployee';
import Start from '../Layout/Start';
import EmployeeLogin from '../Layout/EmployeeLogin';

import ManageStock from '../Pages/Adminmangestock/ManageStock';
import Addstocks from '../Pages/Adminmangestock/Addstocks';
import HomeEmployee from '../Pages/Employees/HomeEmployee';
import Employeeinfo from '../Pages/Employees/Employeeinfo';
import Editadmin from '../Pages/Adminmanageemployee/Editadmin';
import Editstock from '../Pages/Adminmangestock/Editstock';
import DashBoardEmployee from '../Layout/DashboardEmployee';
import Editprofile from '../Pages/Employees/Editprofile';
import Reports from '../Pages/Adminmanageemployee/Reports';
import Createreport from '../Pages/Adminmanageemployee/Createreport';
import Employeereports from '../Pages/Employees/Employeereports';
import EditReport from '../Pages/Adminmanageemployee/EditReport';
import PrivateRoute from '../Components/PrivateRoute';
import Leave from '../Pages/Employees/Leave';
import Leave_request from '../Pages/Employees/Leave_request';
import Requests from '../Pages/Adminmanageemployee/Requests';
import EditRequest from '../Pages/Employees/EditRequest';


const Pagesroutes = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={ <Start/>} ></Route>
      <Route path='/start' element={ <Start/>} ></Route>
      <Route path='/employee_login' element={ <EmployeeLogin/>} ></Route>
      <Route path='/adminlogin' element={ <AdminLogin/>} ></Route>
      <Route path='/dashboardemployee' element={ 
        <PrivateRoute>
          <DashBoardEmployee/>
        </PrivateRoute>
      } >
         <Route path='' element={<HomeEmployee/>}></Route>
         <Route path='/dashboardemployee/edit_profile' element={<Editprofile/>}></Route>
         <Route path='employee_info' element={<Employeeinfo/>}></Route>
         <Route path='leave' element={<Leave/>}></Route>
         <Route path='request_leave' element={<Leave_request/>}></Route>
         <Route path='edit_request/:id' element={ <EditRequest/>} ></Route>
         <Route path='employeereports' element={<Employeereports/>}></Route>
        </Route>
      <Route path='/dashboard' element={ 
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      } >
            <Route path='' element={<Home/>}></Route>
            <Route path='/dashboard/employee' element={ <Employee/>} ></Route>
            <Route path='/dashboard/category' element={ <Category/>} ></Route>
            <Route path='/dashboard/profile' element={ <Profile/>} ></Route>
            <Route path='/dashboard/add_category' element={ <AddCategory/>} ></Route>
            <Route path='/dashboard/add_employee' element={ <AddEmployee/>} ></Route>
            <Route path='/dashboard/add_admin' element={ <Addadmin/>} ></Route>
            <Route path='/dashboard/edit_employee/:id' element={ <EditEmployee/>} ></Route>
            <Route path='/dashboard/manage_stock' element={ <ManageStock/>} ></Route>
            <Route path='/dashboard/add_stocks' element={ <Addstocks/>} ></Route>
            <Route path='/dashboard/reports' element={ <Reports/>} ></Route>
            <Route path='/dashboard/edit_report/:id' element={ <EditReport/>} ></Route>
            <Route path='/dashboard/create_report' element={ <Createreport/>} ></Route>
            <Route path='/dashboard/edit_admin/:id' element={ <Editadmin/>} ></Route>
            <Route path='/dashboard/edit_stock/:id' element={ <Editstock/>} ></Route>
            <Route path='/dashboard/requests' element={ <Requests/>} ></Route>

        
        </Route>

        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Pagesroutes
