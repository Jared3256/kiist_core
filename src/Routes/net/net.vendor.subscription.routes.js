import express from "express";
import { hasPermission } from "../../middleware/hasPermission.js";
import {
  filterVendorSubscription,
  createVendorSubscription,
  listAllVendorSubscriptions,
  removeVendorSubscription,
  updateVendorSubscription,
  activateVendorSubscription,
} from "../../controller/net/netVendorSubscriptionController.js";
import { verifyJwt } from "../../middleware/verifyJWT.js";
const vendorSubscriptionRouter = express.Router();

// Verify the token
vendorSubscriptionRouter.use(verifyJwt);

// List all Subscription
// Method GET
vendorSubscriptionRouter
  .route("/listAll")
  .get(hasPermission(["read_all", "read_v_u"]), listAllVendorSubscriptions);

// Delete Subscription
// Method DELETE
vendorSubscriptionRouter.route("/:id/delete").delete(removeVendorSubscription);

// Create Subscription
// Method POST
vendorSubscriptionRouter.route("/create").post(createVendorSubscription);

// Filter Subscription
// Method GET
vendorSubscriptionRouter.route("/filter").get(filterVendorSubscription);

// Update Subscription
// Method Update
vendorSubscriptionRouter.route("/:id/update").put(updateVendorSubscription);

// Activate subscription
// Method PATCH
vendorSubscriptionRouter
  .route("/:id/activate")
  .patch(activateVendorSubscription);
export default vendorSubscriptionRouter;
