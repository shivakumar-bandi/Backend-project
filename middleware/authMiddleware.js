const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.WhatIsYourName); // Ensure you have JWT_SECRET in your environment variables

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
