const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in environment variables

    // Find the user associated with the token
    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Attach token and user to request
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
