import express from "express";
import {
  netCreateVendor,
  netDeleteVendor,
  netListVendors,
  netGetVendorById,
  netUpdateVendor,
  netPricingPlan,
  netDiscounts,
} from "../../controller/net/netVendorController.js";

const vendorRouter = express.Router();

// Method POST
// Endpoint to create a vendor
vendorRouter.route("/api/vendor/create").post(netCreateVendor);

// Method DELETE
// Endpoint to remove a vendor
vendorRouter.route("/api/vendor/:vendorId/delete").delete(netDeleteVendor);

// Method GET
// Endpoint to get all vendors
vendorRouter.route("/api/vendor/list").get(netListVendors);

// Method GET
// Endpoint to get one vendor with the provided Id
vendorRouter.route("/api/vendor/:vendorId/find").get(netGetVendorById);

// Method PUT
// Endpoint to update name and location of the vendor
vendorRouter.route("/api/vendor/:vendorId/update").put(netUpdateVendor);

// Method PUT
// Endpoint to update the pricing plan
vendorRouter.route("/api/vendor/:vendorId/pricing_plan").put(netPricingPlan);

// Method PUT
// Endpoint to update the discounts
vendorRouter.route("/api/vendor/:vendorId/discounts").put(netDiscounts);
export default vendorRouter;
