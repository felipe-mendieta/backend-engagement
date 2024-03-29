const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { UserContainer } = require('../models/classes/user.container');

const generateJWT = (uuid = '') => {
  return new Promise((resolve, reject) => {

    const payload = { uuid };

    jwt.sign(payload, config.secretPrivateKey, {
      expiresIn: '2h'// El token expira en 4 horas (ajusta según tus necesidades)
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('Could not generate toke.')
      } else {
        resolve(token);
      }
    })
  });
}

const checkJWT = async (token = '') => {

  try {

    if (token.length < 10) {
      return null;
    }

    const { uuid } = jwt.verify(token, config.secretPrivateKey);
    console.log("uuid: ",uuid);
    const user = await UserContainer.getUser(uuid);//se remplazaria con la busqueda en la base de datos
    console.log("user in ram: ",user);
    if (user) {
      return user;
    } else {
      return null;
    }

  } catch (error) {
    return null;
  }
}

module.exports = {
  generateJWT,
  checkJWT
}

