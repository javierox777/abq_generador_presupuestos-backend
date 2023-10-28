const jwt = require("jsonwebtoken")
const USER = require("../../model/user/user")
const ctrls = {}

ctrls.verify =async (req, res)=>{
    
   
    try {
        const { authorization } = req.headers;
        console.log("req.headers", req.headers)
        if (!authorization) {
          return  res.json({ message: 'Authorization token missing' });
        }
    
        const accessToken = authorization.split(' ')[1];
        const { _id} = jwt.verify(accessToken, "inventario");
        console.log("_id ", _id)
        const user =await USER.findOne({_id:_id});
      
        if (!user) {
          return  res.json({ message: 'Invalid authorization token' });
        }
        res.json({user})
      } catch (error) {
        return res.json ({ message: 'Internal server error' });
      }
      
}





module.exports = ctrls