import axios from "axios";
import { JournalEntryList } from "../../types/common/JournalEntryTypes";


export const dbClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_ADDRESS}/api`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});