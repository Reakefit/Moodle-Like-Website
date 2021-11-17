import { Strategy, ExtractJwt } from 'passport-jwt';

const JwtStrategy = Strategy;
import mongoose from 'mongoose';
const User = mongoose.model("users");
import { secret } from './keys.js'

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

export default function(passport) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};