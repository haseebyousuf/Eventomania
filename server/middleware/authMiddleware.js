import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const checkRole = (roles) => {
  return async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
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
