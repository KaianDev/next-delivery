import type { User } from "@/types/user"

export interface DataState {
  user: User | null
  token: string
}

export interface Actions {
  type: AuthActions
  payload: any
}

export enum AuthActions {
  LOGIN = "user/login",
  LOGOUT = "user/logout",
}

export interface IAuthContextProviderProps {
  children: React.ReactNode
}
