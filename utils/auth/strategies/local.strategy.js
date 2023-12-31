const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../src/services/user.service');
const service = new UserService();

const LocalStrategy = new Strategy({//personalizando como la estrategia va a recibir los campos
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {

    try {
      const user = await service.getByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      if (!user.status) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
