const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

require('dotenv').config();
const morgan=require('morgan');

const app=express();
const port=process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads',express.static('uploads'));

const uri=process.env.ATLAST_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true });

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Mongoose Database Connection Established Successfully");
});

const blogRouter=require('./routes/blog');
const usersRouter=require('./routes/users');
const profileRouter=require('./routes/profile');

app.use('/blog',blogRouter);
app.use('/users',usersRouter);
app.use('/profile',profileRouter);

app.use((req,res,next)=>{
    const error=new Error('Not Found');;
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

app.listen(port,()=>{
console.log(`Server is running on port: ${port}`);
});