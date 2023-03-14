import Users from "../Modal/Users.js";
import jwt from 'jsonwebtoken';
const TokUser = async (req) => {
  const SECRET = process.env.SECRET
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    try {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const me = jwt.verify(bearerToken, SECRET)
      let user = await Users.findById({ _id: me._id, isDeleted: false }).populate([{ path: "role", select: "RoleName permission" }]);
      return user
    } catch (e) {
      // console.log("Error", e);
    }
  }
}
export default TokUser