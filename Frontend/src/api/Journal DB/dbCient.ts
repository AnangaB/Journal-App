import axios from "axios";


export const dbClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_ADDRESS}/api`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});