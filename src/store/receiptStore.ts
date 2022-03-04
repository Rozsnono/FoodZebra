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
}

export const useReceiptStore = defineStore({
  id: "receiptStore",
  state: (): IState => ({
    loading: false,
    numberOfReceipt: 0,
    receipt: [],
    oneReceipt: {},
    authorReceipt: [],
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
  },
  actions: {
    async createNewReceipt(params: INewReceiptParams): Promise<void> {
      this.loading = true;
      $axios
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
          author: "",
          rate: 0,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.post);
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(params);
          console.error("hiba: " + error);

          // context.commit("setLoading", false);
          this.loading = false;
        });
    },
    async editPostById(params: IEditParams): Promise<void> {
      this.loading = true;
      $axios
        .patch(`receipt/${params._id}`, {
          title: params.title,
          content: params.content,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async ratingReceipt(params: IRatingParams): Promise<void> {
      this.loading = true;
      $axios
        .patch(`receipt/${params._id}`, {
          _id: params._id,
          rate: params.rate,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async deletePostById(params: IIdParams): Promise<void> {
      this.loading = true;
      $axios
        .delete(`receipt/${params._id}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.status);
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async fetchPosts(): Promise<void> {
      this.loading = true;
      $axios
        .get("receipt")
        .then((res) => {
          if (res && res.data) {
            this.receipt = res.data.receipt;
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async auhtorReceipt(params: string): Promise<any> {
      this.loading = true;
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
          return all;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          return { hiba: error };
        })
        .then((noterror) => {
          console.log("asd");
          return [];
        });

      this.loading = true;
      await $axios
        .get(`receipt/author/${params}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
            this.receipt = res.data.receipt;
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async getReceiptById(params: string): Promise<Object | any> {
      this.loading = true;
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
          return one;
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
    async fetchPaginatedPosts(params: IPaginatedParams): Promise<void> {
      this.loading = true;
      $axios
        .get(
          `receipt/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.receipt = res.data.receipt;
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
  },
});
