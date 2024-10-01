export const getUser = () => {
  const userStr = localStorage.Item('appState');
  if (userStr) return JSON.parse(userStr);
  else return null;
}


// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('appState');
}

// set the token and user from the session storage
export const setUserSession = (appState) => {
  localStorage.setItem('appState', JSON.stringify(appState));
}
