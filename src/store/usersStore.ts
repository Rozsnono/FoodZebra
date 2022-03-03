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
}

export const useUsersStore = defineStore({
  id: "usersStore",
  state: (): IState => ({
    loading: false,
    errorMsg: "",
    loggedUser: null,
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
          sessionStorage.setItem("currentUser",this.loggedUser?._id);
          this.loading = false;
        })
        .catch(() => {
          this.loggedUser = null;
          this.loading = false;
          this.errorMsg = "Error on Authentication";
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
