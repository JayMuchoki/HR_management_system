
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';






export const adminLogin=(req,res) =>{
  const sql="SELECT * FROM admin WHERE  email=?"
  con.query(sql,[req.body.email],(error,result)=>{
    if(error){
      res.json({ loginstatus: false, Error: "Query Error" })
    }else{
      if(result.length>0){
        bcrypt.compare(req.body.password,result[0].password,(error,response)=>{
          if(error){
            res.json({ loginstatus: false, Error: "Query Error" })
          }
          if(response){
            const email=result[0].email;
            const token=jwt.sign({role:"admin",email:email }, "admin secret key",{expiresIn:'1d'})
            res.cookie('token', token);
            return res.json({ loginstatus: true, token });
          }
          else{
            return res.json({ loginstatus: false, Error: "Wrong email or password " });
          }
        })
      }else{
        return res.json({ loginstatus: false, Error: "Email not found" });
      }
    }
  })
}

export const getadmininfo = async(req, res) => {
  const token =  await req.cookies.token;
  try {
    const decoded = jwt.verify(token, 'admin secret key');
    const userEmail = decoded.email;

    const sql = "SELECT * FROM admin WHERE email = ?";
    con.query(sql, [userEmail], (error, result) => {
      if (error) {
        console.error('Database query error:', error.message);
        return res.json({ Status: false, Error: "Query Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ Status: false, Error: "Admin not found" });
      }
      return res.json({ Status: true, Result: result });
    });
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


export const addCategory = (req, res) => {
  const sql = "INSERT INTO category (name) VALUES(?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
};

export const getCategory = (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const addEmployee = (req, res) => {
  const sql = 'INSERT INTO employee (name, email,department, password, salary, station, category_id, image) VALUES(?)';
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query problem Error" });

    const values = [
      req.body.name,
      req.body.email,
      req.body.department,
      hash,
      req.body.salary,
      req.body.station,
      req.body.category_id,
      req.file.filename // Save the image path
    ];

    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Data passing error or Email" });
      return res.json({ Status: true, Result: result });
    });
  });
};

export const getEmployee = (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};


export const addadmin = (req, res) => {
  const sql = "INSERT INTO admin (name,email, password) VALUES(?)";
  bcrypt.hash(req.body.password, 17, (err, hash) => {
    if (err) {
      return res.json({Status: false, Error: "Query Error"});
    } else {
      const values = [
        req.body.name,
        req.body.email,
        
         hash
        ];
      con.query(sql, [values], (error, request) => {
        if (error) {
          return res.json({Status: false, Error: "Query Error"});
        } else {
          return res.json({Status: true, Result: request});
        }
      });
    }
  });
};
export const getadmins= (req,res) =>{
  const sql="SELECT * FROM admin "
  con.query(sql,(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })
};

export const getemployeeid=(req,res) =>{
  const  id=req.params.id;
  const sql="SELECT * FROM employee WHERE id=? "
  con.query(sql,[id],(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })
}

export const editemployeeid =(req,res) =>{
  const id=req.params.id
  const sql="UPDATE employee set name=?, email=?, salary=?,station=?, category_id=?  where id=?"
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.station,
    req.body.category_id
  
  ];
  con.query(sql,[...values,id],(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })
}

export const deleteemployee=(req,res) =>{
  const id=req.params.id
  const sql="DELETE FROM employee where id=?"
  con.query(sql,[id],(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })

}

export const getadmincount=(req,res) =>{
  const sql='select count(id) as admin from admin'
  con.query(sql,(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })
}

export const getemployeecount=(req,res) =>{
  const sql='select count(id) as employee from employee'
  con.query(sql,(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })
}

export const getsalarycount=(req,res) =>{
  const sql='select sum(salary )as totalsalary from employee'
  con.query(sql,(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })
}

export const gettotalstock=(req,res)=>{
  const sql='select count(id) as totalstock from stock'
  con.query(sql,(error,result)=>{
    if (error) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });

  })
}

export const getlogout = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    res.clearCookie('token');
    return res.json({ Status: true, Message: "Logout successful" });
  } else {
    return res.json({ Status: false, Message: "No token found" });
  }
};


export const getadminid=(req,res) =>{
  const  id=req.params.id;
  const sql="SELECT * FROM admin WHERE id=? "
  con.query(sql,[id],(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })
}

export const editadmin = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE admin SET name = ?, email = ?, password = ? WHERE id = ?";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ Status: false, Error: "Hashing Error" });
    } else {
      const values = [req.body.name, req.body.email, hash, id];
      con.query(sql, values, (err, result) => {
        if (err) {
          return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result });
      });
    }
  });
};

export const deletadmin=(req,res)=>{
  const id=req.params.id
  const sql ="DELETE FROM  admin where id=?"
  con.query(sql,[id],(error,result)=>{
    if (error) {
      return res.json({ Status: false, Error: "Query Error" });
    }else{
    return res.json({ Status: true, Result: result });
    }
  })
}

export const deletecategory=(req,res)=>{
  const id=req.params.id
  const sql ="DELETE FROM  category where id=?"
  con.query(sql,[id],(error,result)=>{
    if (error) {
      return res.json({ Status: false, Error: "Query Error" });
    }else{
    return res.json({ Status: true, Result: result });
    }
  })
}
export const  createreport=(req,res)=>{
  const sql='INSERT INTO reports (report) VALUES(?)'
  con.query(sql,[req.body.report],(error,result)=>{
    if (error) {
      return res.json({ Status: false, Error: "Query Error" });
    }else{
    return res.json({ Status: true, Result: result });
    }
  })
}

export const getreports=(req,res)=>{
  
  const sql="SELECT * FROM reports "
  con.query(sql,(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })

}

export const deletereport=(req,res)=>{
  const id=req.params.id
  const sql ="DELETE FROM  reports where id=?"
  con.query(sql,[id],(error,result)=>{
    if (error) {
      return res.json({ Status: false, Error: "Query Error" });
    }else{
    return res.json({ Status: true, Result: result });
    }
  })
}

export const getreportid=(req,res) =>{
  const  id=req.params.id;
  const sql="SELECT * FROM reports WHERE id=? "
  con.query(sql,[id],(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({Status: true, Result: result });
  })
}

export const editreport=(req,res)=>{
  const id=req.params.id
  const sql="UPDATE reports SET report=? WHERE id=?"
  const values=[req.body.report,id] 

  con.query(sql,values,(error,result)=>{
    if(error){
      return res.json({Status:false,Error:"Query Error"})

    }else{
      return res.json({Status:true,Result:result})
    }
  })
 
}
export const getrequests=(req,res)=>{
  
  const sql="SELECT * FROM requests "
  con.query(sql,(err,result) =>{
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  })

}

export const updatestatusrequest = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE requests SET status = ? WHERE id = ?";
  const values = [req.body.status, id]; // Ensure 'status' is the field name you want to update

  con.query(sql, values, (error, result) => {
    if (error) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      if (result.affectedRows === 0) {
        return res.json({ Status: false, Error: "No request found with the provided ID." });
      }
      return res.json({ Status: true, Result: result });
    }
  });
};