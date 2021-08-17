import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../config/default';
import { UserDTO } from '../components/user/userDTO';
import UsersRepository from '../components/user/usersRepository';
import { PassportStatic } from 'passport';
import {getRepository} from 'typeorm';
import {User} from '../entities/User';

export const applyPassportStrategy = (passport: PassportStatic): void => {
  const tokenOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.tokenSecret,
  };

  passport.use(
    'jwt-token',
    new Strategy(tokenOptions, async (payload: UserDTO, done: (err: Error, payload?: UserDTO | boolean) => void) => {
      //here JWT is valid now we have to check whether user is also valid one
      try {
        const usersRepository = new UsersRepository(getRepository(User));
        const user = await usersRepository.findById(payload.id);
        if (user) {
          //here both jwt and user are valid, we can proceed
          delete user.password;
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err);
      }
    }),
  );

  const refreshTokenOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.refreshTokenSecret,
  };

  passport.use(
    'jwt-refresh-token',
    new Strategy(
      refreshTokenOptions,
      async (payload: { id: string }, done: (err: Error, payload?: UserDTO | boolean) => void) => {
        //here JWT is valid now we have to check whether user is also valid one
        try {
          const usersRepository = new UsersRepository(getRepository(User));
          const user = await usersRepository.findById(payload.id);

          if (user) {
            //here both jwt and user are valid, we can proceed
            delete user.password;
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          done(err);
        }
      },
    ),
  );
};
