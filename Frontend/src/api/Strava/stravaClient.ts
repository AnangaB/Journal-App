import axios from "axios";


export const stravaClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_ADDRESS}/api/strava`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});