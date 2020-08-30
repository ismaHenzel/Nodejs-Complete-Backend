import User from '../Model/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default{
    async verify(req, res){
        const {email, password} = req.body;
        let user = await User.findOne({email: email})
        if(!user) return res.status(401).json({auth: false, message: "Email_Not_Found"});
        const validating = await bcrypt.compare(password, user.password);
        if(!validating) return res.status(401).json({auth: false, message: "Incorrect_Password"});   
        if(!user.authenticated) return res.status(401).json({auth: false, message: "Email_Not_Authenticated"})
        
        let token = jwt.sign({id:user._id}, process.env.SECRET_PASS, {
            expiresIn: 4200
        })
        return res.send({auth: true, token: token})
    }

}