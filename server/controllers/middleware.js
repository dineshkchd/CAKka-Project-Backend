const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const middleware = {

    emailIdRequired: (req,res,next)=>{
      let email = req.body.email
      if(email == " " || ! email){
        res.json({status:false,message:"Please enter a valid email"})
      }
      else{
        next()
      }
    },

    checkToken: (req, res, next) => {
      let token = req.headers['access_token'] || req.headers['authorization'];
      if (!token) {
          return res.json({ status: false, message: " Wrong token"});
      }
      if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }
      if (token) {
          jwt.verify(token, JWT_SECRET, async (err, decoded) => {
          if (err) {
              return res.json({ status: false, message: "Wrong token"});
              
          }
  
          let admin_id = decoded.admin_id;
          req.body.admin_id = admin_id;
          console.log("admin_id",admin_id)
          req.token = token
          next();
          });
      } else {
          return res.json({ status: false, message: "Wrong token" });
      }
    },
};

module.exports = { ...middleware };
