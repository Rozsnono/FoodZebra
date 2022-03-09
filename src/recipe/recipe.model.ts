import { Schema, model } from "mongoose";
import Recipe from "./recipe.interface";

const recipeSchema = new Schema<Recipe>(
    {
        name: String,
        type: String,
        difficulty: Number,
        description: String,
        energy: Number,
        time: Number,
        price: Number,
        serving: Number,
        ingredients: Array,
        author: String,
        rate: Number,
        pic: String,
    },
    { versionKey: false },
);

const recipeModel = model<Recipe>("recipe", recipeSchema);

export default recipeModel;
