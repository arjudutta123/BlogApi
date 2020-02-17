const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const Profile=require('../models/profile');

router.post('/signup',(req,res,next)=>{
    Profile.find({email:req.body.email})
    .exec()
    .then(profile=>{
        if(profile.length>=1){
            return res.status(409).json({
                message:'Email Already Existed'
            });
        } else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err,
                        message:'hash Failed'
                    });
                }else{
                const profile=new Profile({
                    _id:new mongoose.Types.ObjectId(),
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    password:hash
                    });
                    profile.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message:'profile Created'
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err,
                            message:'Error creating profile'
                        });
                    });
                }
            });        
        }  
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err,
            message:'Error Total'
        });
    });
    
});


router.post('/login',(req,res,next)=>{
    Profile.findOne({ email: req.body.email })
    .then((profile) => {
        if (profile === null) {
            let err = new Error('profile not found!');
            err.status = 401;
            return next(err);
        }
        bcrypt.compare(req.body.password, profile.password, function (err, status) {
            if (!status) {
                let err = new Error('Password does not match!');
                err.status = 401;
                return next(err);
            }
            res.json({ status: 'Login Successful!' });
        });
    }).catch(next)
});


module.exports=router;