import { Types } from "mongoose";
export default interface Receipt {
    _id: Types.ObjectId | string;
    name: string;
    type: string;
    difficulty: number;
    description: string;
    energy: number;
    time: number;
    price: number;
    serving: number;
    ingredients: object;
    author: string;
}
