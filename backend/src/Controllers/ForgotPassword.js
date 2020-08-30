import User from "../Model/User.js";
import bcrypt from "bcrypt";
export default {
    async update(req, res){
        const {id} = req.params;
        const {password} = req.body;
        if(!password || password.length < 0)
        {
            return res.status(400).json({password: false, messge: "blanck password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        console.log(password, id)
        const user = await User.findByIdAndUpdate(id, {password: hash});
        console.log(user)
        return res.json(user);
    }
}