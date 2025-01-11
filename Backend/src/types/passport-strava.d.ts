declare module 'passport-strava' {
    import { Strategy as PassportStrategy } from 'passport';
  
    export interface StravaProfile {
      id: number;
      firstname: string;
      lastname: string;
      city: string;
      country: string;
    }
  
    export interface StravaTokens {
      accessToken: string;
      refreshToken: string;
    }
  
    export class Strategy extends PassportStrategy {
      constructor(options: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
      }, verify: (
        accessToken: string,
        refreshToken: string,
        profile: StravaProfile,
        done: (error: any, user?: any) => void
      ) => void);
      }
  }
  