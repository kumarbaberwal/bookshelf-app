import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/api';

// {"user": {"__v": 0, "_id": "67d9cdd76309355d84b7b705", "createdAt": "2025-03-18T19:47:35.324Z", "email": "kumar@gmail.com", "profileImage": "https://api.dicebear.com/7.x/avataaars/svg?seed=Nitesh Kumar", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q5Y2RkNzYzMDkzNTVkODRiN2I3MDUiLCJpYXQiOjE3NDIzMjcyNTUsImV4cCI6MTc0MzYyMzI1NX0.J91n_a-ufmz4ss74LusTzV6UOM9BDxOUsf8VnWUxjN8", "updatedAt": "2025-03-18T19:47:35.324Z", "username": "Nitesh Kumar"}}

type User = {
  __v: number,
  _id: string,
  createdAt: string,
  email: string,
  profileImage: string,
  token: string,
  updatedAt: string,
  username: string,
}

type AuthStore = {
  user: User | null,
  token: string | null,
  isLoading: boolean

  register: ({ username, email, password }: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean, error?: string }>

  login: ({ email, password }: {
    email: string, password: string
  }) => Promise<{ success: boolean, error?: string }>

  checkAuth: () => Promise<void>;

  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async ({ username, email, password }: {
    username: string;
    email: string;
    password: string;
  }) => {
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await response.json();
      // console.log("The coming data is: ", data);
      if (!response.ok || !data.user) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem('user', JSON.stringify(data.user))
      await AsyncStorage.setItem('token', data.user.token)

      set({ user: data.user, token: data.user.token, isLoading: false });

      return {
        success: true,
      }

    } catch (error) {
      set({ isLoading: false })
      // console.log(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  },

  login: async ({ email, password }: { email: string, password: string }) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      const data = await response.json();
      if (!response.ok || !data.user) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.user.token);

      set({ user: data.user, token: data.user.token, isLoading: false });

      return {
        success: true,
      }

    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const jsonUser = await AsyncStorage.getItem('user');
      const user = jsonUser ? JSON.parse(jsonUser) : null;
      set({ user, token })
    } catch (error) {
      console.log("Error in checkAuth: ", error);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    set({ user: null, token: null })
  },
}));