import jwt from "jsonwebtoken";
export const middleware = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized", success: false });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
