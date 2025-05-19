// Import express async handler
import asyncHandler from "express-async-handler";

// import the netVendorSubscription Model
import { NetVendorSubscription } from "../../models/net/vendor.subscription.net.js";

// import Vendor Model
import { NetVendor } from "../../models/net/vendor.net.js";
import mongoose from "mongoose";

// Function to List all vendorSubscriptions
// Access Private
// Endpoint /net/api/vendor/subscription/listAll
export const listAllVendorSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await NetVendorSubscription.find({});

  if (subscriptions.length < 1) {
    return res
      .status(404)
      .json({ message: "no subscriptions found", success: false });
  }

  return res.status(200).json({
    message: "successfully found all subscriptions",
    success: true,
    subscriptions,
  });
});

// Function to delete vendorSubscription
// Access private
// Endpoint Endpoint /net/api/vendor/subscription/id/delete
export const removeVendorSubscription = asyncHandler(async (req, res) => {
  return res.status(405).json({
    message: "cannot remove subscription after its created",
    success: false,
  });
});

// Function to create vendorSubscription
// Access Private
// Endpoint /net/api/vendor/subscription/create
export const createVendorSubscription = asyncHandler(async (req, res) => {
  let foundVendor;
  const {
    vendorId,
    amount,
    plan,
    active,
    isDefault,
    duration,
    allowedDevices,
  } = req.body;

  // Check if the crucial data are missing
  if (!vendorId || !amount || !plan || !duration) {
    return res
      .status(400)
      .json({ message: "critical information is missing", success: false });
  }

  // Check the length of the vendorId
  if (String(vendorId).length !== 24) {
    return res
      .status(417)
      .json({ message: "vendor id format is mismatching", success: false });
  }

  // Check the plan value
  if (
    !(
      plan === "hourly" ||
      plan === "daily" ||
      plan === "weekly" ||
      plan === "monthly"
    )
  ) {
    return res
      .status(412)
      .json({ message: `${plan} is currently not supported`, success: false });
  }
 
  try {
    if (Number(amount) < 1) {
      return res.status(406).json({
        message: "cannot accept values below 1 for amount",
        success: false,
      });
    }
  } catch (error) {
    return res.status(406).json({
      message: "cannot accept values below 1 for amount",
      success: false,
    });
  }
  try {
    if (Number(allowedDevices) < 1) {
      return res.status(406).json({
        message: "cannot accept values below 1 for devices",
        success: false,
      });
    }
  } catch (error) {
    return res.status(406).json({
      message: "cannot accept values below 1 for amount",
      success: false,
    });
  }
  try {
    if (Number(duration) < 1) {
      return res.status(406).json({
        message: "cannot accept values below 1 for duration",
        success: false,
      });
    }
  } catch (error) {
    return res.status(406).json({
      message: "cannot accept values below 1 for duration",
      success: false,
    });
  }

  // Check if a vendor exist with the vendorId provided
  try {
    foundVendor = await NetVendor.findById(vendorId);

    if (!foundVendor) {
      return res.status(417).json({
        message: "vendor id passed does not match any vendor",
        success: false,
      });
    }
  } catch (error) {
    return res.status(417).json({
      message: "vendor id passed does not match any vendor",
      success: false,
    });
  }

  // Check if the a subscription already exists
  const foundSubscription = await NetVendorSubscription.findOne({
    vendorId,
    amount,
    plan,
    duration,allowedDevices
  });

  if (foundSubscription) {
    return res.status(409).json({
      message: "that subscription is already posted. kindly update",
      success: false,
    });
  }

  let currentDefault = isDefault;

  // Get the vendor subscription plans
  const vendorSubs = foundVendor.subscriptions;

  if (vendorSubs.length < 1) {
    currentDefault = false;
  }
  // Create the model and save
  const newSubscription = new NetVendorSubscription({
    vendorId,
    amount,
    plan,
    active,
    isDefault: currentDefault,
    duration,
    allowedDevices,
  });

  await newSubscription.save();

  foundVendor.subscriptions = [...vendorSubs, newSubscription._doc];

  await foundVendor.save();

  return res.status(200).json({
    message: "vendor subscription plan created successfully",
    success: true,
    subscription: newSubscription,
  });
});

// Function to Filter vendorSubscriptions
// Access Private
// Endpoint /net/api/vendor/subscription/filter
export const filterVendorSubscription = asyncHandler(async (req, res) => {
  const { vendorId, amount, plan, active, isDefault, duration } = req.body;

  // Check the length of the vendorId

  if (vendorId && String(vendorId).length !== 24) {
    return res
      .status(417)
      .json({ message: "vendor id format is mismatching", success: false });
  }

  let plans = await NetVendorSubscription.find({});
  if (vendorId) {
    plans = plans.filter((plan) => {
      if (new mongoose.Types.ObjectId(vendorId).equals(plan.vendorId)) {
        return plan;
      }
    });
  }

  if (Number(duration) && Number(duration) > 0) {
    plans = plans.filter((plan) => {
      if (plan.duration === Number(duration)) {
        return plan;
      }
    });
  }
  if (Number(amount) && Number(amount) > 0) {
    plans = plans.filter((plan) => {
      if (plan.amount === Number(amount)) {
        return plan;
      }
    });
  }

  if (plan) {
    plans = plans.filter((planS) => {
      if (planS.plan === plan) {
        return plan;
      }
    });
  }
  if (active) {
    plans = plans.filter((plan) => {
      if (plan.active === active) {
        return plan;
      }
    });
  }
  if (isDefault) {
    plans = plans.filter((plan) => {
      if (plan.isDefault === isDefault) {
        return plan;
      }
    });
  }

  if (plans.length < 1) {
    return res.status(417).json({
      message: "no subscription plan matches filter pattern",
      success: false,
    });
  }

  return res.status(200).json({
    message: "successfully filtered the plans",
    success: true,
    subscriptions: plans,
  });
});

// Function to Update the vendorSubscription
// Access Private
// Endpoint /net/api/vendor/subscription/id/update
export const updateVendorSubscription = asyncHandler(async (req, res) => {
  const { amount, plan, active, duration } = req.body;
  const { id } = req.params;

  // Check the length of the Id
  if (String(id).length !== 24) {
    return res.status(417).json({
      message: "subscription id format is mismatching",
      success: false,
    });
  }

  let foundSubscriptionPlan;
  // Check if there exist a subscription plan with the provided Is
  try {
    foundSubscriptionPlan = await NetVendorSubscription.findById(id);

    if (!foundSubscriptionPlan) {
      return res
        .status(417)
        .json({ message: "no subscription plan matches the Id" });
    }
  } catch (error) {
    return res
      .status(417)
      .json({ message: "no subscription plan matches the Id" });
  }

  if (amount) {
    foundSubscriptionPlan.amount = Number(amount);
  }

  if (Number(duration) && Number(duration) > 0) {
    foundSubscriptionPlan.duration = duration;
  }
  if (
    plan &&
    (plan === "hourly" ||
      plan === "daily" ||
      plan === "weekly" ||
      plan === "monthly")
  ) {
    foundSubscriptionPlan.plan = plan;
  }

  if (active && active !== foundSubscriptionPlan.active) {
    foundSubscriptionPlan.active = active;
  }

  await foundSubscriptionPlan.save();

  return res.status(200).json({
    message: "successfully updated the subscription plan",
    success: true,
  });
});

// Function to activate subscription
// Access Private
// Endpoint /net/api/vendor/subscription/id/activate
export const activateVendorSubscription = asyncHandler(async (req, res) => {
  // find  the id from the request params
  const { id } = req.params;

  // Check the length  of the id
  if (String(id).length !== 24) {
    return res
      .status(400)
      .json({ message: "id format is mismatching", success: false });
  }

  try {
    const foundVendorSubscription = await NetVendorSubscription.findById(id);

    if (!foundVendorSubscription) {
      return res
        .status(417)
        .json({
          message: "no such subscription is currently available",
          success: false,
        });
    }

    foundVendorSubscription.active = true;

    await foundVendorSubscription.save();

    return res
      .status(200)
      .json({ message: "subscription activated successfully", success: true });
  } catch (error) {
    return res.status(417).json({
      message: "no such subscription is currently available",
      success: false,
    });
  }
});
