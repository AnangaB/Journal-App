import passport from 'passport';
import { strava_strategy } from './stravaStrategy'; 
import { Router } from 'express';

const router = Router();

// Add Strava connection
passport.use(strava_strategy);

// Serialize and deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user); // Deserialize the user into the session
});

// Strava authentication routes
router.get('/auth/strava', passport.authenticate('strava', {
    scope: 'activity:read_all'
  }));

router.get(
  '/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/', scope: 'activity:read_all' }),
  (req, res) => {
    res.send('Strava account connected successfully!');
  }
);

export default router;