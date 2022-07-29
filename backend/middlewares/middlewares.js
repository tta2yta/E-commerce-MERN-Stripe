const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;
    if (authHead) {
      const token = authHead.split(" ")[1];
      jwt.verify(token, process.env.SECRETE_JWT, (err, user) => {
        req.user = user; // modifies or adds user object to the request object and add user object to the next req-res cycle
        if (err) {
          if (err.message === "jwt expired")
            return res.send("Your Session is expired : Please sign in again.");
          res.send("Oh Something is wrong !. Please try again later");
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString(s) });
  }
};
// either the the user putting his id  or the the one who poses role with admin are authorized to perform any modification

const checkTokenAndAuthorization = async (req, res, next) => {
  checkToken(req, res, () => {
    if (
      req.user.id === req.params.id ||
      req.user.id === req.body.userId ||
      req.user.role.toLowerCase() === "seller"
    ) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  });
};
const authorize = async (req, res, next) => {
  const userId = req.parmas.userId;
  try {
    if (
      req.user.id === req.parmas.userId ||
      req.user.role.toLowerCase() === "seller"
    ) {
      next();
    }
  } catch (err) {
    res.status(403).json({ error: "Forbidden" });
  }
};
const checKTokenAndSeller = async (req, res, next) => {
  try {
    checkToken(req, res, () => {
      if (req.user.role.toLowerCase() === "seller") {
        next();
      } else res.status(403).json({ error: "Forbidden" });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  checkToken,
  checkTokenAndAuthorization,
  checKTokenAndSeller,
};
