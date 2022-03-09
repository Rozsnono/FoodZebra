import { Types } from "mongoose";
export default interface Recipe {
    _id: Types.ObjectId | string;
    name: string;
    type: string;
    difficulty: number;
    description: string;
    energy: number;
    time: number;
    price: number;
    serving: number;
    ingredients: Array<String>;
    author: string;
    rate: number;
    pic: string;
}
