import Users from "../models/UserModel.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const showBoards = AsyncHandler(async (req, res, next) => {
  const id = req.user;
  const user = await Users.findById(id);
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
});
