export interface Authorization {
  login: string,
  password: string
}

export const AUTHORIZATION_REDUCER_NODE = 'authorization';

export interface AuthorizationState {
  authorizationList: Authorization[];
}

interface Action {
  type: string
}

const initialState: AuthorizationState = {
  authorizationList: []
}
export const authorizationReducer = (state = initialState, action: Action) =>{
  return state;
};
