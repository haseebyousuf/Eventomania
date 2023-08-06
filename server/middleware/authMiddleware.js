import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// export const isAdmin = async (req, res, next) => {
//   let token;
//   token = req.cookies.jwt;
//   console.log(req);
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const admin = await Admin.findOne({ _id: decoded.userId }).select("role");
//       const adminRole = admin ? admin.role : null;
//       if (!adminRole === "admin") return res.status(401).send("Not Admin");
//       next();
//     } catch (error) {
//       return res.status(401).send("Not Authorized, Invalid Token");
//     }
//   } else {
//     return res.status(401).send("Not Authorized, No Token");
//   }
// };

export const checkRole = (roles) => {
  return async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    console.log(req.cookies);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ _id: decoded.userId }).select(
          "role"
        );
        const adminRole = admin ? admin.role : null;
        if (admin && roles.includes(adminRole)) {
          next();
        } else {
          return res.status(401).send("Forbidden");
        }
      } catch (error) {
        return res.status(401).send("Not Authorized");
      }
    } else {
      return res.status(401).send("Not Authorized, No Token");
    }
  };
};
