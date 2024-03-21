import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpoAsyncStorageAdapter = {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    AsyncStorage.removeItem(key);
  },
};

const supabaseUrl = 'https://gpqnncjzlfxfihaqpdry.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || " "

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoAsyncStorageAdapter ,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
