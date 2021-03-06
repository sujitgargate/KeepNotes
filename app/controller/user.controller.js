var userService = require('../services/user.service')

exports.createUser = (req,res)=>{
        req.assert('name', 'Name cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });
       
        // Check for validation errors    
        var errors = req.validationErrors();
        if (errors) { return res.status(400).send(errors); }
        else{
            userService.Signup(req,res)
       }  
}

exports.confirmUser =(req,res)=>{
    try{
        req.assert('name', 'Name cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });
        
        var error = req.validationErrors();
        if(error){
            return status(400).send(error);
        }else{
            userService.confirmUser(req,res);
        }
    }catch(error){
        req.send(error)
    }
}

exports.login=(req,res)=>{
    try{
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.sanitize('email').normalizeEmail({ remove_dots: false });

        var error = req.validationErrors();
        if(error){
            return status(400).send(error);
        }else{
            userService.login(req,res);
        }
    }catch(error){
        res.send(error)        
    }
}

exports.passwordReset=(req,res)=>{
    try{
        req.assert('email','Email not valid').isEmail();
        req.sanitize('email').normalizeEmail({remove_dots:false});
        var error=req.validationErrors();
        if(error){ 
            return send(error);
        }else{
            userService.passwordReset(req,res);
        }
    }catch (error) {
        res.send(error);
    }
}

exports.updatePassword=(req,res)=>{
    req.assert('password','password must be atleast 4 char long').len(4);

    var errors = req.validationErrors();

    if(errors){ return res.send(errors)}
    else{
        userService.updatePassword(req,res);
    }
}