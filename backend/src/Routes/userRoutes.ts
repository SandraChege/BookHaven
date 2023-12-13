import Router from "express";
import {
  checkUserDetails,
//   forgotPassword,
  getAllUsers,
  getOneUser,
  loginUser,
  registerUser,
//   resetPassword,
  updateUserDetails,
//   getFollowers,
//   getFollowings,
//   toggleFollowUser,
} from "../Contollers/userContoller";
import { verifyToken } from "../Middlewares/verfiyToken";

const user_router = Router();

user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/checkuserdetails", verifyToken, checkUserDetails);
user_router.get("/getallusers", verifyToken, getAllUsers);
user_router.post("/getoneuser", getOneUser);
user_router.put("/updateuser", updateUserDetails);
// user_router.post("/resetpassword", resetPassword);
// user_router.post("/forgot", forgotPassword);

// user_router.get("/getFollowers/:ID", getFollowers);
// user_router.get("/getFollowings/:ID", getFollowings);
// user_router.post("/toggleFollowUser", toggleFollowUser);

export default user_router;
