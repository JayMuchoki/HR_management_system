
import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { 
  adminLogin, 
  addCategory, 
  getCategory, 
  addEmployee, 
  getEmployee, 
  addadmin,
  getadmins,
  getemployeeid,
  editemployeeid,
  deleteemployee,
  getadmincount,
  getemployeecount,
  getsalarycount,
  getlogout,
  getadmininfo,
  gettotalstock,
  getadminid,
  editadmin,
  deletadmin,
  deletecategory,
  createreport,
  getreports,
  deletereport,
  getreportid,
  editreport,
  getrequests,
  updatestatusrequest
} from '../controllers/admincontrollers.js';  

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Appends the file extension
  }
});

const upload = multer({ storage: storage });

router.post('/adminlogin', adminLogin);
router.post('/add_category', addCategory);
router.get('/category', getCategory);
router.post('/add_employee', upload.single('image'), addEmployee);
router.get('/employee', getEmployee);
router.post('/add_admin',addadmin)
router.get('/profile',getadmins)
router.get('/employee/:id',getemployeeid)
router.put('/edit_employee/:id',editemployeeid) 
router.delete('/delete_employee/:id',deleteemployee)
router.get('/admin_count',getadmincount)
router.get('/employee_count',getemployeecount)
router.get('/salary_count',getsalarycount)
router.get('/log_out',getlogout)
router.get('/admin_info',getadmininfo)
router.get('/stock_count',gettotalstock)
router.get('/admin/:id',getadminid)
router.put('/edit_admin/:id',editadmin)
router.delete('/delete_admin/:id',deletadmin)
router.delete('/delete_category/:id',deletecategory)
router.post('/create_report',createreport)
router.get('/reports',getreports)
router.delete('/delete_report/:id',deletereport)
router.get('/report/:id',getreportid)
router.put('/edit_report/:id',editreport)
router.get('/requests',getrequests)
router.put('/requests/:id/status', updatestatusrequest);

export { router as adminRouter };
