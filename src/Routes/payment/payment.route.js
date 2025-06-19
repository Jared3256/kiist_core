import express from "express";
import createPAYController from "../../controller/payment/createPAYController.js";

const paymentRouter = express.Router();

paymentRouter.post("/daraja_callback", createPAYController.callback);
paymentRouter.get("/authorization", createPAYController.authorization);
paymentRouter.post("/stkpush", createPAYController.stkpush);
paymentRouter.post("/validation", createPAYController.validation)
export default paymentRouter;
