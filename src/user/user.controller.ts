import { Router, Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Controller from "../interfaces/controller.interface";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "./user.dto";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import IdNotValidException from "../exceptions/IdNotValidException";
import HttpException from "../exceptions/HttpException";
import userModel from "./user.model";
import receiptModel from "../receipt/receipt.model";
import User from "./user.interface";

export default class UserController implements Controller {
    public path = "/users";
    public router = Router();
    private user = userModel;
    private receipt = receiptModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/receipt/:id`, authMiddleware, this.getAllReceiptOfUserByID);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        this.router.get(this.path, authMiddleware, this.getAllUsers);

        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateUserDto, true)], this.modifyUser);

        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteUser);
    }

    private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.user.find().then(users => {
                res.send(users);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }
                const user = await this.user.findById(id);
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const userData: User = req.body;
                const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.user.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllReceiptOfUserByID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (Types.ObjectId.isValid(req.params.id)) {
                const id: string = req.params.id;
                const receipt = await this.receipt.find({ author: id });
                res.send(receipt);
            } else {
                next(new IdNotValidException(req.params.id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
