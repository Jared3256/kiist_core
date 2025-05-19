import {
  createPayment,
  deletePayment,
  updatePayment,
  listAllPayment,
  paymentSummary,
  filterPayment,
} from "../../controller/net/netPaymentController.js";

// Import the router from express package
import express from "express"


const paymentRouter = express.Router();

// create payment Endpoint
// Method POST
paymentRouter.route("/create").post(createPayment);

// delete payment Endpoint
// Method DELETE
paymentRouter.route("/:id/delete").delete(deletePayment);

// update payment Endpoint
// Method PUT
paymentRouter.route("/:id/update").put(updatePayment);

// list all payment endpoint
// Method GET
paymentRouter.route("/listAll").get(listAllPayment);

// payment summary endpoint
// Method GET
paymentRouter.route("/summary/:id").get(paymentSummary);

// filter payment with inputs endpoints
// Method GET
paymentRouter.route("/filter").get(filterPayment);

export default paymentRouter;
