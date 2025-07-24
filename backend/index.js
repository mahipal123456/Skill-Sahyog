require('dotenv').config();
const express= require('express');
const cors = require('cors');
const ConnectDb=require('./config/DB')
const authrouter=require('./routes/auth')
const projectrouter=require('./routes/project')
const userrouter=require('./routes/user')
const app = express();
const port=process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
ConnectDb();
app.use('/auth',authrouter);
app.use('/api',projectrouter);
app.use('/user',userrouter);
app.get('/',(req,res,next)=>{
    res.send("hii")
});
app.listen(port,()=>{
    console.log("app is running");
})