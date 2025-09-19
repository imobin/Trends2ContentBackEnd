const jwt = require("jsonwebtoken");



function verifyToken(req, res, next) {
  // Get token from the header
  const authHeader = req.headers['authorization'];
//   console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
// res.send(token)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// res.send(decoded)
//   if (!token) {
//     return res.status(403).send('A token is required for authentication');
//   }

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Attach the decoded user payload to the request object
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send('Invalid Token');
//   }

  // Proceed to the next middleware or route handler
  // res.send(decoded)
  return next();
}

module.exports = verifyToken