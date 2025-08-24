import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, Login again' });
  }

  try {
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decoded.userId;
    next();
  } catch (error) {
    // This catch block automatically handles expired tokens!
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
