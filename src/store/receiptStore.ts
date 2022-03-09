import $axios from "./axios.instance";
import { defineStore } from "pinia";

export interface IReceipt {
  _id: string;
  name: string;
  type: string;
  description: string;
  energy: number;
  time: number;
  price: number;
  serving: number;
  difficulty: number;
  rate: number;
  pic: string;
  ingredients: object;
}

interface IState {
  loading: boolean;
  numberOfReceipt: number;
  receipt: Array<IReceipt>;
  oneReceipt: Object;
  authorReceipt: any;
  PaginatedReceipt: any;
  code: number;
}

interface IPaginatedParams {
  offset: number;
  limit: string;
  order: string;
  sort: string;
  keyword: string;
}

interface IIdParams {
  _id: string;
}

export interface IEditParams {
  _id: string;
  name: string;
  type: string;
  description: string;
  energy: number;
  time: number;
  price: number;
  serving: number;
  difficulty: number;
  pic: string;
  ingredients: object;
}

export interface IRatingParams {
  _id: string;
  rate: number;
}

export interface INewReceiptParams {
  _id: string;
  name: string;
  type: string;
  description: string;
  energy: number;
  time: number;
  price: number;
  serving: number;
  difficulty: number;
  rate: number;
  pic: string;
  ingredients: object;
  author: string;
}

export const useReceiptStore = defineStore({
  id: "receiptStore",
  state: (): IState => ({
    loading: false,
    numberOfReceipt: 0,
    receipt: [],
    oneReceipt: {},
    authorReceipt: [],
    PaginatedReceipt: [],
    code: 0,
  }),
  getters: {
    getLoading(): boolean {
      return this.loading;
    },
    getReceipt(): Array<IReceipt> {
      
      return this.receipt;
    },
    getNumberOfReceipt(): number {
      return this.numberOfReceipt;
    },
    getOneReceipt(): any {
      return this.oneReceipt;
    },
    getAuthorReceipt(): any {
      return this.authorReceipt;
    },
    getPaginatedReceipt(): any {
      return this.PaginatedReceipt;
    },
    getCode(): number {
      return this.code;
    },
  },
  actions: {
    async createNewReceipt(params: INewReceiptParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .post("receipt", {
          name: params.name,
          type: params.type,
          description: params.description,
          energy: params.energy,
          time: params.time,
          pic: params.pic,
          price: params.price,
          serving: params.serving,
          difficulty: params.difficulty,
          ingredients: params.ingredients,
          author: params.author,
          rate: 0,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.post);
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
          this.code = 200;
          console.log(this.code);
        })
        .catch((error) => {
          console.log(params);
          console.error("hiba: " + error);
          // context.commit("setLoading", false);
          this.loading = false;
          this.code = 404;
        });
    },
    async editReceiptById(params: IEditParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      $axios
        .patch(`receipt/${params._id}`, {
          name: params.name,
          type: params.type,
          description: params.description,
          energy: params.energy,
          time: params.time,
          pic: params.pic,
          price: params.price,
          serving: params.serving,
          difficulty: params.difficulty,
          ingredients: params.ingredients,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
          }
          this.loading = false;
          this.code = 200;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
        });
    },
    async ratingReceipt(params: IRatingParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      $axios
        .patch(`receipt/rating/${params._id}`, {
          _id: params._id,
          rate: params.rate,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
          }
          this.code = 200;
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
        });
    },
    async deleteReceiptById(params: IIdParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .delete(`receipt/${params._id}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.status);
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
          this.code = 200;
          console.log(this.code);
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
        });
    },
    async fetchReceipt(): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .get("receipt")
        .then((res) => {
          if (res && res.data) {
            this.receipt = res.data.receipt;
            console.log(this.receipt);
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
          this.code = 200;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
        });
    },
    async auhtorReceipt(params: string): Promise<any> {
      this.loading = true;
      this.code = 0;
      let all = [];
      await $axios
        .get(`receipt/author/${params}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
            all = res.data;
            this.authorReceipt = res.data;
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
          console.log(all);
          this.code = 200;
          return all;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
          return { hiba: error };
        })
        .then((noterror) => {
          console.log("asd");
          this.code = 200;
          return [];
        });
    },
    async getReceiptById(params: string): Promise<Object | any> {
      this.loading = true;
      this.code = 0;
      let one = {};
      await $axios
        .get(`receipt/${params}`)
        .then((res) => {
          if (res && res.data) {
            one = res.data;
            this.oneReceipt = one;
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
          console.log(one);
          this.code = 200;
          return one;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
          return { hiba: error };
        })
        .then((noterror) => {
          console.log("asd");
          this.code = 200;
          return {};
        });
    },
    async fetchPaginatedReceipt(params: IPaginatedParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .get(
          `receipt/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.PaginatedReceipt = res.data.receipt;
            console.log(this.PaginatedReceipt);
            this.numberOfReceipt = res.data.count;
          }
          this.code = 200;
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.code = 404;
          this.loading = false;
        });
    },
  },
});
