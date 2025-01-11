import strategy from '@riderize/passport-strava-oauth2';
import dotenv from 'dotenv';
dotenv.config();


const StravaStrategy = strategy.Strategy;

const stravaConfig: strategy.StrategyOption = {
  clientID: process.env.STRAVA_CLIENT_ID || "",
  clientSecret: process.env.STRAVA_CLIENT_SECRET || "",
  callbackURL: process.env.STRAVA_REDIRECT_URI || ""
};

export const strava_strategy = new StravaStrategy(
  stravaConfig,
  async (accessToken, refreshToken, profile, done) => {
    console.log(process.env.STRAVA_CLIENT_ID,  process.env.STRAVA_CLIENT_SECRET, process.env.STRAVA_CALLBACK)
    return done(null, profile);
  }
);

  