const jwt = require('jsonwebtoken');

// Authentication middleware to verify JWT
module.exports = (req, res, next) => {
  // Get the token from the auth header
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  // Extract the token by splitting the header string. Token should be second part after "Bearer"
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  // Verify JWT using secret from .env
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    // Attach decoded user info to req.user
    req.user = decoded;
    next();
  });
};
