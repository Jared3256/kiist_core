import express from "express";
import createPAYController from "../../controller/payment/createPAYController.js";

const paymentRouter = express.Router();

paymentRouter.post("/back", createPAYController.callback);
paymentRouter.get("/authorization", createPAYController.authorization);
paymentRouter.post("/stkpush", createPAYController.stkpush);
paymentRouter.post("/validation", createPAYController.validation)

//Jenga specific routes
paymentRouter.post("/jenga/authorization", createPAYController.jenga_authorize)
paymentRouter.post("/jenga/stkpush", createPAYController.jenga_stkpush)
paymentRouter.post("/j/back", createPAYController.jenga_callback)
export default paymentRouter;
