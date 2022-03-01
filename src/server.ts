import { config } from "dotenv";
import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import ReceiptController from "./receipt/receipt.controller";
import ReportController from "./report/report.controller";
import UserController from "./user/user.controller";
import validateEnv from "./utils/validateEnv";

config(); // Read and set variables from .env file.
validateEnv();

const app = new App([new ReceiptController(), new AuthenticationController(), new UserController(), new ReportController()]);

app.listen();
