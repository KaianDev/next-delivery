import { createContext, useContext, useReducer } from "react"
import {
  AuthActions,
  type DataState,
  type IAuthContextProviderProps,
} from "./types"
import type { User } from "@/types/user"
import { initialState, reducer } from "./reducer"

interface IAuthContext {
  auth: DataState
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const [auth, dispatch] = useReducer(reducer, initialState)

  const login = (user: User, token: string) => {
    dispatch({
      type: AuthActions.LOGIN,
      payload: {
        user,
        token,
      },
    })
  }

  const logout = () => {
    dispatch({
      type: AuthActions.LOGOUT,
      payload: {
        user: null,
        token: "",
      },
    })
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
