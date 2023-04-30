import jwt from "jsonwebtoken";

const AuthCheck = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({ error: "Please Login To Access Data" });
  }
  const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decodedData.id;
  next();
};

export default AuthCheck;
