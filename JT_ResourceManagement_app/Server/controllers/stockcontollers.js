import con from '../utils/db.js';

const addStock = (req, res) => {
  const sql = "INSERT INTO stock (item, stockin, stockout, allocated, remainingstock) VALUES (?)";
  const values = [
    req.body.item,
    req.body.stockin,
    req.body.stockout,
    req.body.allocated,
    req.body.remainingstock
  ];

  con.query(sql, [values], (error, result) => {
    if (error) {
      return res.json({ status: false, Error: "Query error" });
    }
    return res.json({ status: true, result });
  });
};

const manageStock = (req, res) => {
  const sql = "SELECT * FROM stock";

  con.query(sql, (error, result) => {
    if (error) {
      res.json({ status: false, Error: error });
    } else {
      res.json({ status: true, Result: result });
    }
  });
};

const getStockItem = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM stock WHERE id = ?";

  con.query(sql, [id], (error, result) => {
    if (error) {
      res.json({ Status: false, Error: error });
    } else {
      res.json({ Status: true, Result: result });
    }
  });
};

const editStock = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE stock SET item = ?, stockin = ?, stockout = ?, allocated = ?, remainingstock = ? WHERE id = ?";
  const values = [
    req.body.item,
    req.body.stockin,
    req.body.stockout,
    req.body.allocated,
    req.body.remainingstock,
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

const deleteStockItem = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM stock WHERE id = ?";

  con.query(sql, [id], (error, result) => {
    if (error) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

export { addStock, manageStock, getStockItem, editStock, deleteStockItem };
