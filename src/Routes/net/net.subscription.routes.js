import express from "express";
import {
  createSubscription,
  deleteSubscription,
  filterSubscription,
  listAllSubscription,
  summarySubscription,
  updateSubscription,
} from "../../controller/net/netSubscriptionController.js";

const subscriptionRouter = express.Router();

// List All Subscription
// Method GEt
subscriptionRouter.route("/listAll").get(listAllSubscription);

// Delete Subscription
// Method DELETE
subscriptionRouter.route("/:id/delete").delete(deleteSubscription);

// Create Subscription
// Method POST
subscriptionRouter.route("/create").post(createSubscription);

// Filter Subscription
// Method GET
subscriptionRouter.route("/filter").get(filterSubscription);

// Create summary of subscription
// Method GET
subscriptionRouter.route("/summary/:id").get(summarySubscription);

// Update Subscription
// Method PUT
subscriptionRouter.route("/update").put(updateSubscription);
export default subscriptionRouter;
