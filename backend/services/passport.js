const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { model } = require("mongoose");

const User = model("users");

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      const profileJSON = profile["_json"]
      User.findOne({googleID: profile.id} , async (error, user) => {
        try {
          if (error) return done(error);
          if (user) return done(null, user);
          const newUser = await new User({
            name: profileJSON.given_name,
            surname: profileJSON.family_name,
            pictureURL: profileJSON.picture,
            googleID: profile.id,
            googleEmail: profileJSON.email,
          }).save();
          return done(null, newUser);
        } catch (error) {
          throw Error(error);
        }
      });
    }
  )
);