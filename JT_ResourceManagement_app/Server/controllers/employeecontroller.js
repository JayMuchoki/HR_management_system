import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const employeeLogin = (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ loginstatus: false, Error: "Query Error" });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (error, response) => {
        if (error) {
          return res.json({ loginstatus: false, Error: "Error comparing passwords" });
        }
        if (response) {
          const id = result[0].id;
          const email = result[0].email;
          const token = jwt.sign({ role: 'employee', email: email, id: id }, "employee_secret_key", { expiresIn: '1d' });
          res.cookie('token', token, { httpOnly: true });
          return res.json({ loginstatus: true, id: id, token });
        } else {
          return res.json({ loginstatus: false, Error: "Wrong email or password" });
        }
      });
    } else {
      return res.json({ loginstatus: false, Error: "Email not found" });
    }
  });
};

const getEmployeeInfo = (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [req.userEmail], (error, result) => {
    if (error) {
      console.error('Database query error:', error.message);
      return res.json({ Status: false, Error: "Query Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ Status: false, Error: "Employee not found" });
    }
    return res.json({ Status: true, Result: result });
  });
};

const logOut = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    res.clearCookie('token');
    return res.json({ Status: true, Message: "Logout successful" });
  } else {
    return res.json({ Status: false, Message: "No token found" });
  }
};

const editUser = (req, res) => {
  const sql = "UPDATE employee SET name = ?, email = ?, password = ? WHERE id = ?";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ Status: false, Error: "Hashing Error" });
    } else {
      const values = [req.body.name, req.body.email, hash, req.userId];
      con.query(sql, values, (err, result) => {
        if (err) {
          return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result });
      });
    }
  });
};
 const leaverequest=(req,res)=>{
  const sql='INSERT INTO requests (name,email,startdate,enddate,reason) value(?,?,?,?,?)'
  const values=[
    req.body.name,
    req.body.email,
    req.body.startdate,
    req.body.enddate,
    req.body.reason
  ]
  con.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
 }

 const getuserrequest = (req, res) => {
  const sql = "SELECT * FROM requests WHERE email = ?";
  con.query(sql, [req.userEmail], (error, result) => {
    if (error) {
      console.error('Database query error:', error.message);
      return res.json({ Status: false, Error: "Query Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ Status: false, Error: "Employee not found" });
    }
    return res.json({ Status: true, Result: result });
  });
};

 const deleterequest=(req,res)=>{
  const id=req.params.id
  const sql ="DELETE FROM  requests where id=?"
  con.query(sql,[id],(error,result)=>{
    if (error) {
      return res.json({ Status: false, Error: "Query Error" });
    }else{
    return res.json({ Status: true, Result: result });
    }
  })
}

 const getrequestid=(req,res) =>{
  const  id=req.params.id;
  const sql="SELECT * FROM requests WHERE id=? "
  con.query(sql,[id],(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({Status: true, Result: result });
  })
}


const editrequest = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE requests SET name= ?, email= ?, startdate = ?, enddate = ?, reason = ? WHERE id = ?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.startdate,
    req.body.enddate,
    req.body.reason,
    id
  ];

  con.query(sql, values, (error, result) => {
    if (error) {
      res.json({ Status: false, Error: error });
    } else {
      res.json({ Status: true, Result: result });
    }
  });
};
export { employeeLogin, getEmployeeInfo, logOut, editUser,leaverequest,getuserrequest,deleterequest,getrequestid,editrequest};
