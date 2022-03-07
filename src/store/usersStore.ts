import $axios from "./axios.instance";
import { defineStore } from "pinia";

interface IUser {
  _id?: string;
  email?: string;
  name?: string;
  password?: string;
}

interface IState {
  loading: boolean;
  errorMsg: string;
  loggedUser: null | IUser;
  user: object;
}

export const useUsersStore = defineStore({
  id: "usersStore",
  state: (): IState => ({
    loading: false,
    errorMsg: "",
    loggedUser: null,
    user: {},
  }),
  getters: {
    getLoading(): boolean {
      return this.loading;
    },
    getErrorMsg(): string {
      return this.errorMsg;
    },
    getLoggedUser(): null | IUser {
      return this.loggedUser;
    },
    getUser(): null | Object {
      return this.user;
    },
  },
  actions: {
    clearErrorMsg(): void {
      this.errorMsg = "";
    },
    async loginUser(params: IUser): Promise<void> {
      this.loading = true;
      $axios
        .post("auth/login", {
          email: params.email,
          password: params.password,
        })
        .then((res) => {
          this.loggedUser = res.data;
          sessionStorage.setItem("currentUser", this.loggedUser?._id);
          this.loading = false;
        })
        .catch(() => {
          this.loggedUser = null;
          this.loading = false;
          this.errorMsg = "Error on Authentication";
        });
    },
    async getUserById(params: string): Promise<Object | any> {
      this.loading = true;
      await $axios
        .get(`auth/${params}`)
        .then((res) => {
          if (res && res.data) {
            this.user = res.data;
          }
          console.log(this.user);
          return this.user;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          return { hiba: error };
        })
        .then((noterror) => {
          console.log("asd");
          return {};
        });
    },
    async logOut(): Promise<void> {
      this.loading = true;
      $axios
        .post("auth/logout")
        .then(() => {
          sessionStorage.removeItem("currentUser");
          this.loggedUser = null;
          this.loading = false;
        })
        .catch(() => {
          this.loggedUser = null;
          this.loading = false;
        });
    },
  },
});
