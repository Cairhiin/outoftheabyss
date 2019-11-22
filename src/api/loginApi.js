import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import request from 'request-promise-native';

function login(credentials) {
  const { username, password } = credentials;
  const saltedPassword = password + process.env.REACT_APP_SALT_KEY;

  const saltedPassHash = crypto
              .createHash('sha256')
              .update(saltedPassword)
              .digest('hex');

  return fetch(process.env.REACT_APP_DB_HOST + '/rest/siteusers', {
    method: 'GET',
    headers: {
      "content-type": "application/json",
      "x-apikey": process.env.REACT_APP_API_KEY,
      "cache-control": "no-cache"
    }
  })
  .then(res => res.json())
  .then(data => {

    const user = data.filter(user => {

      return (user.username === username && user.password === saltedPassHash);
    });

    if (user.length) {
      const userDetailsToHash = username + user[0].role;
      const token = jwt.sign(userDetailsToHash, process.env.REACT_APP_JWT_SECRET);

      return {
        username: username,
        role: user[0].role,
        token: token
      };
    }
    return false;
  })
  .catch(() => false);
}

function register(credentials) {
  const { username, password, lastName, firstName, email } = credentials;
  const saltedPassword = password + process.env.REACT_APP_SALT_KEY;

  const saltedPassHash = crypto
              .createHash('sha256')
              .update(saltedPassword)
              .digest('hex');

  let options = {
    method: 'POST',
    url: process.env.REACT_APP_DB_HOST + '/rest/siteusers',
    headers: {
      "content-type": "application/json",
      "x-apikey": process.env.REACT_APP_API_KEY,
      "cache-control": "no-cache",
    },
    body: { username: username, password: saltedPassHash,
        firstName: firstName, lastName: lastName, email: email },
    json: true
  }

  return request(options)
    .then(res => res._id)
    .catch(() => false);
}

export {
  login,
  register
};
