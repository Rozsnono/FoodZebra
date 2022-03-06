import { Router, Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import IdNotValidException from "../exceptions/IdNotValidException";
import HttpException from "../exceptions/HttpException";
import Controller from "../interfaces/controller.interface";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreatePostDto from "./receipt.dto";
import Receipt from "./receipt.interface";
import receiptModel from "./receipt.model";

export default class PostController implements Controller {
    public path = "/receipt";
    public router = Router();
    private receipt = receiptModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllReceipt);
        this.router.get(`${this.path}/:id`, this.getReceiptById);
        this.router.get(`${this.path}/author/:author`, authMiddleware, this.getAllReceiptByUser);
        this.router.get(`${this.path}/:offset/:limit/:order/:sort/:keyword?`, this.getPaginatedReceipt);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreatePostDto, true)], this.modifyReceipt);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteReceipt);
        this.router.post(this.path, [authMiddleware, validationMiddleware(CreatePostDto)], this.createReceipt);
    }

    private getAllReceipt = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const posts = await this.post.find().populate("author", "-password");
            const count = await this.receipt.countDocuments();
            const receipt = await this.receipt.find();
            res.send({ count: count, receipt: receipt });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllReceiptByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.author;
            const count = await this.receipt.find({ author: { $eq: id } }).countDocuments();
            const receipt = await this.receipt.find({ author: { $eq: id } }).populate("author", "-password");
            // const receipt = await this.receipt.find();
            res.send({ teszt: "true", author: id, count: count, receipt: receipt });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getPaginatedReceipt = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const order = req.params.order;
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let receipt = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.receipt.find({ $or: [{ title: { $regex: regex } }, { content: { $regex: regex } }] }).count();
                receipt = await this.receipt
                    .find({ $or: [{ title: { $regex: regex } }, { content: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.receipt.countDocuments();
                receipt = await this.receipt
                    .find({})
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, receipt: receipt });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getReceiptById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const post = await this.receipt.findById(id).populate("author", "-password");
                if (post) {
                    res.send(post);
                } else {
                    next(new PostNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyReceipt = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const postData: Receipt = req.body;
                const post = await this.receipt.findByIdAndUpdate(id, postData, { new: true });
                if (post) {
                    res.send(post);
                } else {
                    next(new PostNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private createReceipt = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const receiptData: Receipt = req.body;
            const createdreceipt = new this.receipt({
                ...receiptData,
                author: req.user._id,
            });
            const savedreceipt = await createdreceipt.save();
            await savedreceipt.populate("author", "-password");
            res.send(savedreceipt);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteReceipt = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.receipt.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new PostNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
