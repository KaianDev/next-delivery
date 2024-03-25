import { type DataState, AuthActions, type Actions } from "./types"

export const initialState: DataState = {
  user: null,
  token: "",
}

export const reducer = (state = initialState, action: Actions): DataState => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        token: "",
      }
    default:
      return state
  }
}
