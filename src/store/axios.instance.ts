import axios from "axios";

const $axios = axios.create({
  baseURL: "https://foodzebra2.herokuapp.com/",
  withCredentials: true,
});

export default $axios;
