// src/services/authService.ts
import { AuthResponse, LoginCredentials, RegisterData } from '../types';

const API_URL = 'https://swan-botanical.onrender.com/api/auth';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return await response.json();
};
  
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await response.json();
};