import { JsonWebTokenError } from "jsonwebtoken";

export function checkToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({ msg: 'Acesso negado'});
  }

  try {
    const secret = process.env.SECRET;

    JsonWebTokenError.verify(token, secret);

    next();

  } catch(error) {
    return res.status(400).json({ msg: 'Token Inválido'});
  }
};