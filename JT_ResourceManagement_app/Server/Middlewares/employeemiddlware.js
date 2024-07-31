import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, "employee_secret_key");
    req.userEmail = decoded.email; 
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export { verifyToken };
