import $axios from "./axios.instance";
import { defineStore } from "pinia";

export interface IRecipe {
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
  numberOfRecipe: number;
  recipe: Array<IRecipe>;
  oneRecipe: Object;
  authorRecipe: any;
  PaginatedRecipe: any;
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

export interface INewRecipeParams {
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

export const useRecipeStore = defineStore({
  id: "recipeStore",
  state: (): IState => ({
    loading: false,
    numberOfRecipe: 0,
    recipe: [],
    oneRecipe: {},
    authorRecipe: [],
    PaginatedRecipe: [],
    code: 0,
  }),
  getters: {
    getLoading(): boolean {
      return this.loading;
    },
    getRecipe(): Array<IRecipe> {
      
      return this.recipe;
    },
    getNumberOfRecipe(): number {
      return this.numberOfRecipe;
    },
    getOneRecipe(): any {
      return this.oneRecipe;
    },
    getAuthorRecipe(): any {
      return this.authorRecipe;
    },
    getPaginatedRecipe(): any {
      return this.PaginatedRecipe;
    },
    getCode(): number {
      return this.code;
    },
  },
  actions: {
    async createNewRecipe(params: INewRecipeParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .post("recipe", {
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
            this.numberOfRecipe = res.data.count;
          }
          this.loading = false;
          this.code = 200;
        })
        .catch((error) => {

          console.error("hiba: " + error);
          // context.commit("setLoading", false);
          this.loading = false;
          this.code = 404;
        });
    },
    async editRecipeById(params: IEditParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .patch(`recipe/${params._id}`, {
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
          this.loading = false;
          this.code = 200;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
        });
    },
    async ratingRecipe(params: IRatingParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .patch(`recipe/rating/${params._id}`, {
          _id: params._id,
          rate: params.rate,
        })
        .then((res) => {
          if (res && res.data) {
            this.code = 200;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
          this.code = 404;
        });
    },
    async deleteRecipeById(params: IIdParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .delete(`recipe/${params._id}`)
        .then((res) => {
          if (res && res.data) {

            this.numberOfRecipe = res.data.count;
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
    async fetchRecipe(): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .get("recipe")
        .then((res) => {
          if (res && res.data) {
            this.recipe = res.data.recipe;

            this.numberOfRecipe = res.data.count;
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
    async auhtorRecipe(params: string): Promise<any> {
      this.loading = true;
      this.code = 0;
      let all = [];
      await $axios
        .get(`recipe/author/${params}`)
        .then((res) => {
          if (res && res.data) {
            all = res.data;
            this.authorRecipe = res.data;
            this.numberOfRecipe = res.data.count;
          }
          this.loading = false;
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

          this.code = 200;
          return [];
        });
    },
    async getRecipeById(params: string): Promise<Object | any> {
      this.loading = true;
      this.code = 0;
      let one = {};
      await $axios
        .get(`recipe/${params}`)
        .then((res) => {
          if (res && res.data) {
            one = res.data;
            this.oneRecipe = one;
            this.numberOfRecipe = res.data.count;
          }
          this.loading = false;

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

          this.code = 200;
          return {};
        });
    },
    async fetchPaginatedRecipe(params: IPaginatedParams): Promise<void> {
      this.loading = true;
      this.code = 0;
      await $axios
        .get(
          `recipe/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.PaginatedRecipe = res.data.recipe;
            this.numberOfRecipe = res.data.count;
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
