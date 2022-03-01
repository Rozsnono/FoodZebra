import $axios from "./axios.instance";
import { defineStore } from "pinia";

export interface IPost {
  _id: string;
  author: string;
  content: string;
  name: string;
  description: string;
}

interface IState {
  loading: boolean;
  numberOfReceipt: number;
  receipt: Array<IPost>;
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
  image: string;
}

export const useReceiptStore = defineStore({
  id: "receiptStore",
  state: (): IState => ({
    loading: false,
    numberOfReceipt: 0,
    receipt: [],
  }),
  getters: {
    getLoading(): boolean {
      return this.loading;
    },
    getReceipt(): Array<IPost> {
      return this.receipt;
    },
    getNumberOfReceipt(): number {
      return this.numberOfReceipt;
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
          image: params.image,
          price: params.price,
          serving: params.serving,
          difficulty: params.difficulty,
          author: "asd",
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.post);
            this.numberOfReceipt = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
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
    async fetchPaginatedPosts(params: IPaginatedParams): Promise<void> {
      this.loading = true;
      $axios
        .get(
          `receipt/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.receipt = res.data.posts;
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
