import type { User } from '@/types/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action';


type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';


type AuthState = {
  // properties
  user: User | null // nulo porque en cierto punto lo es
  token: string | null
  authStatus:AuthStatus
  // getters
  isAdmin : ()=>boolean
  // actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>

}


export const useAuthStore = create<AuthState>()((set,get) => ({
  user: null,
  token: null,
  isAdmin:() =>{
    const roles = get().user?.roles || [];
    return roles.includes('admin');
  },
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, authStatus:'authenticated' })
      return true;
    } catch (error) {
      console.error(error)
      localStorage.removeItem('token');
      set({ user: null, token: null ,authStatus:'not-authenticated'})
      return false;
    }

  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus:'authenticated' })
  },

  authStatus:'checking',
  checkAuthStatus:async() => {
      try {
        const { user, token} = await checkAuthAction();
        set({user,token,authStatus:'authenticated'})
        return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        set({ user: null, token: null ,authStatus:'not-authenticated'})
        return false;
      }
  },
}))

