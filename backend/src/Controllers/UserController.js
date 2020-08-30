import User from "../Model/User.js"

export default {
    async update(req, res){
        try{
            const {_id, email, content} = await req.body;
            let filter = _id? {_id} : {email};
            let update = await User.findOneAndUpdate(filter, content);
            return res.json({sucess:true,  update});
        }catch(error){
            console.error("Error in update data: ", error);
            return res.status(400).json({
                 status: "failed",
                 message: "Error in update data: "+error
            })
        }
    },
    async destroy(req, res){
        try{
            const {_id, email} =  req.body;
            let filter = _id? {_id} : {email};
            let update = await User.findOneAndDelete(filter);
            return res.json({sucess:true,  userDeleted:update});
        }catch(error){
            console.error("Error in update data: ", error);
            return res.status(400).json({error: "Error in remove User : "+error});
        }
    }
}