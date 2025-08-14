// src/api/auth.ts
import axios from 'axios';

const API_URL = 'https://swan-botanical.onrender.com/api/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return {
      user: response.data.user,
      token: response.data.token
    };
  } catch (error) {
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password
    });
    return {
      user: response.data.user,
      token: response.data.token
    };
  } catch (error) {
    throw error;
  }
};