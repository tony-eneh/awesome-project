class AppStore {
  _users= [];
  registerUser(user){this._users.push(user)}
}

const appStore = new AppStore();

export default appStore;
