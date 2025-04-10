export const localStorageService = {
    saveUser(user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
  
    getUser() {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    },
  
    clearUser() {
      localStorage.removeItem('currentUser');
    },
  
    findUserByEmail(email) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      return users.find((u) => u.email === email);
    },
  };
