import express from 'express';
import cors from 'cors';
import { adminRouter } from './Routes/AdminRoutes.js';
import { EmployeeRouter } from './Routes/Employeeroute.js';
import { Stockrouter } from './Routes/managestock.js';
import cookieParser from 'cookie-parser';

Stockrouter

const app = express();

// CORS configuration
app.use(cors({
    origin: ["http://localhost:5173"],  // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT',"DELETE"],
    credentials: true  // Allow cookies to be sent and received
}));

// Other middleware setups
app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee',EmployeeRouter)
app.use('/stock',Stockrouter)
app.use(express.static('public'))


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});