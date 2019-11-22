export function logUser(username) {
  return {
    type: "@auth/LOGIN_USER",
    username: username
  };
}

export function logoutUser() {
  return {
    type: "@auth/LOGOUT_USER",
  };
}
