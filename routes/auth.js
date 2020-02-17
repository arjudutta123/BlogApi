const Staff=require('../models/staff');
const jwt=require('jsonwebtoken');

module.exports.verfyStaff=(req,res,next)=>{
    let authHeader=req.header.authorization;
    if(!authHeader){
        let err=new Error('No authentication information');
        err.status=401;
        return next(err);
    }

    let token=authHeader.split("")[1];
    let data;
    try{
        data=jwt.verify(token,process.env.SECRET)
    }catch(err){
        return next(err);
    }
    Staff.findById(data.staffId)
    .then((staff)=>{
        req.user=user;
        next();
    }).catch(next);
}