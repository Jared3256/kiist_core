// import the express async handler
import asyncHandler from "express-async-handler";

// Import the Subscription Model
import { NetSubscription } from "../../models/net/subscription.net.js";

// Import the NetVendorSubscription Model
import { NetVendorSubscription } from "../../models/net/vendor.subscription.net.js";

// Import the NetUser Model
import { NetUser } from "../../models/net/user.net.js";

// Import the Default User Model
import { NetDefaultUser } from "../../models/net/default.user.net.js";
import { v7 } from "uuid";

// import the date fns package
import { addDays, addHours, addMonths, addWeeks } from "date-fns";
// Function to list all subscriptions
// Access Private
// Endpoint /net/api/user/subscription
export const listAllSubscription = asyncHandler(async (req, res) => {
  const subscriptions = await NetSubscription.find({});

  if (subscriptions.length < 1) {
    return res
      .status(404)
      .json({ message: "no subscription found", success: false });
  }

  return res.status(200).json({
    message: "successfully found all subscriptions",
    success: true,
    subscriptions,
  });
});

// Function to delete subscription
// Access Private
// Endpoint /net/api/user/subscription/id/delete
export const deleteSubscription = asyncHandler(async (req, res) => {
  return res.status(405).json({
    message:
      "deleting user subscription is currently not supported. Kindly change status to suspended",
    success: false,
  });
});

// Function to create subscription
// Access Private
// Endpoint /net/api/user/subscription/create
export const createSubscription = asyncHandler(async (req, res) => {
  // Get the details from request body
  const { userId, vendorSubscription, type, phoneNumber } = req.body;

  // Confirm availability of the details
  if (!vendorSubscription || !type) {
    return res
      .status(400)
      .json({ message: "critical data is missing", success: false });
  }

  if (type === "one-time") {
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ message: "critical data is missing", success: false });
    }
  } else {
    if (!userId) {
      return res
        .status(400)
        .json({ message: "critical data is missing", success: false });
    }
  }
  // The length of the user Id passed
  if (userId && String(userId).length !== 24) {
    return res
      .status(417)
      .json({ message: "user Id format is mismatching", success: false });
  }

  // The length of the vendor subscription Id passed
  if (String(vendorSubscription).length !== 24) {
    return res.status(417).json({
      message: "subscription Id format is mismatching",
      success: false,
    });
  }

  if (!(type === "one-time" || type === "pre-paid")) {
    return res.status(417).json({
      message: `subscription type [${type}] is currently not supported`,
      success: false,
    });
  }

  if (type === "one-time") {
    let defaultUser = await NetDefaultUser.findOne({});

    if (!defaultUser) {
      defaultUser = new NetDefaultUser({});

      await defaultUser.save();
    }

    // Check the length of the phone number
    if (
      !(
        String(phoneNumber).startsWith("07") ||
        String(phoneNumber).startsWith("01") ||
        String(phoneNumber).length === 10
      )
    ) {
      return res.status(412).json({
        message: "phone number is invalid",
        success: false,
      });
    }
    // Get all the subscription of the user
    const foundDefaultUserSubscriptions = defaultUser.subscriptions;

    // Check if that subscription is currently offered by the vendor and its active
    const foundVendorSubscription = await NetVendorSubscription.findById(
      vendorSubscription
    );

    if (!foundVendorSubscription) {
      return res.status(417).json({
        message: "no such subscription currently available",
        success: false,
      });
    }

    if (foundVendorSubscription.active === false) {
      return res.status(417).json({
        message: "subscription is deactivated. we are sorry",
        success: false,
      });
    }

    const activeSubscription = foundDefaultUserSubscriptions.filter(
      (subscription) => {
        if (
          String(subscription.plan).matchAll(foundVendorSubscription.plan) &&
          subscription.endDate > Date.now() &&
          foundVendorSubscription.allowedDevices ===
            subscription.allowedDevices &&
          subscription.phoneNumber === phoneNumber
        ) {
          return subscription;
        }
      }
    );
    if (activeSubscription.length > 0) {
      return res.status(412).json({
        message: `you still have ${foundVendorSubscription.plan} active subscription for ${foundVendorSubscription.allowedDevices} device(s) . try again later`,
        success: false,
      });
    }
    // user end date from the vendor subscription model
    let userEndDate;

    // Adjust the time by hours
    if (foundVendorSubscription.plan === "hourly") {
      userEndDate = addHours(Date.now(), foundVendorSubscription.duration);
    }
    // Adjust the time by days
    if (foundVendorSubscription.plan === "daily") {
      userEndDate = addDays(Date.now(), foundVendorSubscription.duration);
    }
    // Adjust the time by weeks
    if (foundVendorSubscription.plan === "weekly") {
      userEndDate = addWeeks(Date.now(), foundVendorSubscription.duration);
    }
    // Adjust the time by months
    if (foundVendorSubscription.plan === "monthly") {
      userEndDate = addMonths(Date.now(), foundVendorSubscription.duration);
    }
    const code = String(v7()).toUpperCase().slice(24, 35);
    // Create the subscription and save to the database
    const userSub = new NetSubscription({
      userId: defaultUser._doc._id,
      vendorSubscription,
      type,

      endDate: userEndDate,
      subscriptionCode: code,
    });

    await userSub.save();

    // Inject the subscription to the default user mode
    defaultUser.subscriptions = [
      ...foundDefaultUserSubscriptions,
      {
        ...userSub,
        phoneNumber,
        plan: foundVendorSubscription.plan,
        allowedDevices: foundVendorSubscription.allowedDevices,
      },
    ];

    // save the default user  back to the database
    await defaultUser.save();

    return res.status(200).json({
      message: "user has successfully subscribed",
      success: true,
      subscription: userSub._doc,
    });
  } else {
    // Check if user is registered
    const foundUser = await NetUser.findById(userId);

    if (!foundUser) {
      return res
        .status(417)
        .json({ message: "no user linked to id", success: false });
    }

    // Get all the subscription of the user
    const foundUserSubscriptions = foundUser.subscriptions;

    // Check if that subscription is currently offered by the vendor and its active
    const foundVendorSubscription = await NetVendorSubscription.findById(
      vendorSubscription
    );

    if (!foundVendorSubscription) {
      return res.status(417).json({
        message: "no such subscription currently available",
        success: false,
      });
    }

    if (foundVendorSubscription.active === false) {
      return res.status(417).json({
        message: "subscription is deactivated. we are sorry",
        success: false,
      });
    }
    const activeSubscription = foundUserSubscriptions.filter((subscription) => {
      if (
        String(subscription.plan).matchAll(foundVendorSubscription.plan) &&
        subscription.endDate > Date.now() &&
        foundVendorSubscription.allowedDevices === subscription.allowedDevices
      ) {
        return subscription;
      }
    });
    if (activeSubscription.length > 0) {
      return res.status(412).json({
        message: `you still have ${foundVendorSubscription.plan} active subscription for ${foundVendorSubscription.allowedDevices} device(s) . try again later`,
        success: false,
      });
    }
    // user end date from the vendor subscription model
    let userEndDate;

    // Adjust the time by hours
    if (foundVendorSubscription.plan === "hourly") {
      userEndDate = addHours(Date.now(), foundVendorSubscription.duration);
    }
    // Adjust the time by days
    if (foundVendorSubscription.plan === "daily") {
      userEndDate = addDays(Date.now(), foundVendorSubscription.duration);
    }
    // Adjust the time by weeks
    if (foundVendorSubscription.plan === "weekly") {
      userEndDate = addWeeks(Date.now(), foundVendorSubscription.duration);
    }
    // Adjust the time by months
    if (foundVendorSubscription.plan === "monthly") {
      userEndDate = addMonths(Date.now(), foundVendorSubscription.duration);
    }
    const code = String(v7()).toUpperCase().slice(24, 35);
    // Create the subscription and save to the database
    const userSub = new NetSubscription({
      userId,
      vendorSubscription,
      type,
      endDate: userEndDate,
      subscriptionCode: code,
    });

    // Initiate the payment prompt via safaricom

    // Save the user after successful payment
    await userSub.save();

    // inject the subscription to the user model document
    foundUser.subscriptions = [
      ...foundUser.subscriptions,
      {
        ...userSub,
        plan: foundVendorSubscription.plan,
        allowedDevices: foundVendorSubscription.allowedDevices,
      },
    ];

    if (
      foundUser.creditStatus < 1 ||
      foundUser.creditStatus - foundVendorSubscription.amount < 1
    ) {
      return res.status(417).json({
        message: "insufficient fund to complete the subscription",
        success: false,
      });
    } else {
      foundUser.creditStatus =
        foundUser.creditStatus - foundVendorSubscription.amount;
    }
    // Save back the user
    await foundUser.save();

    return res.status(200).json({
      message: "user has successfully subscribed",
      success: true,
      subscription: userSub._doc,
    });
  }
});

// Function to filter subscription
// Access Private
// Endpoint /net/api/user/subscription/filter
export const filterSubscription = asyncHandler(async (req, res) => {});

// Function to summarise subscription
// Access Private
// Endpoint /net/api/user/subscription/summary/userId
export const summarySubscription = asyncHandler(async (req, res) => {});

// Function to update subscription
// Access Private
// Endpoint /net/api/user/subscription/update
export const updateSubscription = asyncHandler(async (req, res) => {});
