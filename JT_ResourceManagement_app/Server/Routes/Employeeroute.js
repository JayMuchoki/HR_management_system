import express from 'express';
import { employeeLogin, getEmployeeInfo, logOut, editUser, leaverequest, getuserrequest, deleterequest, getrequestid, editrequest } from '../controllers/employeecontroller.js';
import { verifyToken } from '../Middlewares/employeemiddlware.js';

const router = express.Router();

router.post('/employee_login', employeeLogin);
router.get('/getemployeeinfo', verifyToken, getEmployeeInfo);
router.get('/log_out', logOut);
router.put('/edit_user', verifyToken, editUser);
router.post('/leave_request',leaverequest)
router.get('/userrequest',verifyToken,getuserrequest)
router.delete('/delete_request/:id',deleterequest)
router.get('/request/:id',getrequestid)
router.put('/edit_request/:id',editrequest)

export { router as EmployeeRouter };
