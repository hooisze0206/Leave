import { extendObservable } from "mobx";

class UserStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLogginid: false,
      username: "",
    });
  }
}

export default UserStore();
