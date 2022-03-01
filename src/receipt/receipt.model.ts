import { Schema, model } from "mongoose";
import Receipt from "./receipt.interface";

const receiptSchema = new Schema<Receipt>(
    {
        name: String,
        type: String,
        difficulty: Number,
        description: String,
        energy: Number,
        time: Number,
        price: Number,
        serving: Number,
        ingredients: Object,
        author: String,
        rate: Number,
    },
    { versionKey: false },
);

const receiptModel = model<Receipt>("receipt", receiptSchema);

export default receiptModel;
