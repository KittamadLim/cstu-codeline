import Elder from '../models/Elder';
import { secret } from '../config';
import { Strategy, ExtractJwt } from 'passport-jwt';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

export default (passport) => {
	passport.use(
		new Strategy(opts, async (payload, done) => {
			await Elder.findById(payload.user_id)
				.then((user) => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch((err) => {
					return done(null, false);
				});
		})
	);
};
