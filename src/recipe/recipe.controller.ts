import { Router, Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import IdNotValidException from "../exceptions/IdNotValidException";
import HttpException from "../exceptions/HttpException";
import Controller from "../interfaces/controller.interface";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreatePostDto from "./recipe.dto";
import Recipe from "./recipe.interface";
import recipeModel from "./recipe.model";

export default class PostController implements Controller {
    public path = "/recipe";
    public router = Router();
    private recipe = recipeModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllRecipe);
        this.router.get(`${this.path}/:id`, this.getRecipeById);
        this.router.get(`${this.path}/author/:author`, authMiddleware, this.getAllRecipeByUser);
        this.router.get(`${this.path}/:offset/:limit/:order/:sort/:keyword?`, this.getPaginatedRecipe);
        this.router.patch(`${this.path}/rating/:id`, [validationMiddleware(CreatePostDto, true)], this.modifyRecipe);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreatePostDto, true)], this.modifyRecipe);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteRecipe);
        this.router.post(this.path, [authMiddleware], this.createRecipe);
    }

    private getAllRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const posts = await this.post.find().populate("author", "-password");
            const count = await this.recipe.countDocuments();
            const recipe = await this.recipe.find();
            res.send({ count: count, recipe: recipe });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllRecipeByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.author;
            const count = await this.recipe.find({ author: { $eq: id } }).countDocuments();
            const recipe = await this.recipe.find({ author: { $eq: id } }).populate("author", "-password");
            // const recipe = await this.recipe.find();
            res.send({ teszt: "true", author: id, count: count, recipe: recipe });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getPaginatedRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const order = req.params.order;
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let recipe = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.recipe.find({ $or: [{ name: { $regex: regex } }, { type: { $regex: regex } }] }).count();
                recipe = await this.recipe
                    .find({ $or: [{ name: { $regex: regex } }, { type: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.recipe.countDocuments();
                recipe = await this.recipe
                    .find({})
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, recipe: recipe });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const post = await this.recipe.findById(id).populate("author", "-password");
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

    private modifyRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const postData: Recipe = req.body;
                const post = await this.recipe.findByIdAndUpdate(id, postData, { new: true });
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

    private rateRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const postData: Recipe = req.body;
                const post = await this.recipe.findByIdAndUpdate(id, postData, { new: true });
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


    private createRecipe = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const recipeData: Recipe = req.body;
            const createdrecipe = new this.recipe({
                ...recipeData,
            });
            const savedrecipe = await createdrecipe.save();
            await savedrecipe.populate("author", "-password");
            res.send(savedrecipe);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.recipe.findByIdAndDelete(id);
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
