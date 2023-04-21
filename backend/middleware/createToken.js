const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const option = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    user,
  });
};

export default sendToken;
