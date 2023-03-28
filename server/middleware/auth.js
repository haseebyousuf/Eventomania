import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try{
    let token = req.header("Authorization");
    if(!token){
      return res.status(403).send("ACCESS DENIED!");
    }
    if(token.startsWith("Bearer ")){
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
      if(err){
        return res.status(400).send("Invalid Token!");
      }
      res.status(200).send(user.id);
    });
    // req.user = verified;
    // res.status(200).send(verified);
    next();
  }catch(err){
    res.status(500).json({error:err.msg})
  }
}