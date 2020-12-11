const jwt = require('jsonwebtoken');

const generateAuth = async (req, res, next) => {
  const token = await req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied.',
    });
  }

  try {
    const decoded = await jwt.verify(token, 'customer_secretKey');
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Token is not valid',
    });
  }
};

module.exports = generateAuth;
