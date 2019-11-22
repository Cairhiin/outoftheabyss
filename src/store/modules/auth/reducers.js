import produce from "immer";

const INITIAL_STATE = {
  username: '',
  isLoggedIn: false
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@auth/LOGIN_USER":
        draft.username = action.username;
        draft.isLoggedIn = true;
        break;
      case "@auth/LOGOUT_USER":
        draft.username = '';
        draft.isLoggedIn = false;
        break;
      default:
    }
  });
}

export const getUsername = state => state.auth.username;
export const getIsLoggedIn = state => state.auth.isLoggedIn;
