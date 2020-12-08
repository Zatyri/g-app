import jwt from 'jsonwebtoken';

const tokenDecoder = (token) => {
  return jwt.decode(token);
};

export const getUserRole = (token) => {
  const decodedToken = tokenDecoder(token);
  return decodedToken.roles[0];
};
