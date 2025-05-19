// Import the NetRouter Model
import { NetRouter } from "../../models/net/router.net.js";

// Import the NetVendor Model
import {NetVendor} from "../../models/net/vendor.net.js";

// Import the bcrypt package to has the password
import bcrypt from "bcrypt";

// Import the asyncHandler from express async Handler
import asyncHandler from "express-async-handler";

// Function to create new Vendor
// Access Private
// Endpoint /net/api/router/create
const createRouter = asyncHandler(async (req, res) => {
  // Get the details from the req body
  const {
    macAddress,
    gatewayDNS,
    rootUsername,
    rootPassword,
    vendorId,
    location,
  } = req.body;

  // Check if the macAddress, gatewayDns, username, vendorId are provided
  if (
    !macAddress ||
    !gatewayDNS ||
    !rootUsername ||
    !rootPassword ||
    !vendorId
  ) {
    return res.status(400).json({
      message: "Router Critical information is missing",
      success: false,
    });
  }

  // Check if the VendorId id is equal to 24
  if (String(vendorId).length !== 24) {
    return res
      .status(417)
      .json({ message: "Vendor Id format mismatching", success: false });
  }

  try {
    // Check if there is a Vendor with the provided Id
    const foundVendor = await NetVendor.findOne({ _id: vendorId });

    if (!foundVendor) {
      return res
        .status(417)
        .json({ message: "No vendor found with the Id", success: false });
    }
  } catch (error) {
    return res
      .status(417)
      .json({ message: "No vendor found with the Id", success: false });
  }

  // Check if the router is already registered
  const foundRouter = await NetRouter.findOne({
    macAddress,
    gatewayDNS,
    rootUsername,
    vendorId,
  });

  if (foundRouter) {
    return res
      .status(409)
      .json({ message: "Router is already created. Kindly update if need be" });
  }

  // Hash the password of the router
  const hashedPassword = await bcrypt.hash(rootPassword, 16);
  // Create the router Model and save to the database
  const newRouter = new NetRouter({
    macAddress,
    gatewayDNS,
    rootUsername,
    rootPassword: hashedPassword,
    vendorId,
  });

  try {
    await newRouter.save();
  } catch (error) {
    return res
      .status(422)
      .json({ message: "Unable to register the router", success: false });
  }

  return res.status(200).json({
    message: "Router created successfully ",
    success: true,
    router: { ...newRouter._doc, rootPassword: undefined },
  });
});

// Function to list all routers from a specific vendor
// Access Private
// Endpoint /net/api/router/list/vendorId
const listRouter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check the length of the Id
  if (String(id).length !== 24) {
    return res
      .status(417)
      .json({ message: "Vendor Id format mismatching", success: false });
  }

  // Check if there exist a vendor with the provided Id
  try {
    // Check if there is a Vendor with the provided Id
    const foundVendor = await NetVendor.findOne({ _id: id });

    if (!foundVendor) {
      return res
        .status(417)
        .json({ message: "No vendor found with the Id", success: false });
    }
  } catch (error) {
    return res
      .status(417)
      .json({ message: "No vendor found with the Id", success: false });
  }

  // Find All routers with the vendorId
  const foundRouters = await NetRouter.find({ vendorId: id }).select(
    "-rootPassword"
  );

  // Check if there any router linked to the vendor
  if (foundRouters.length < 1) {
    return res.status(404).json({
      message: "No router linked to the vendor",
      success: false,
      routers: foundRouters,
    });
  }

  return res.status(200).json({ routers: foundRouters, success: true });
});

// Function to List all routers  from all vendors
// Access Private
// Endpoint /net/api/router/listAll
const listAllRouters = asyncHandler(async (req, res) => {
  const routers = await NetRouter.find().select("-rootPassword");

  // Check if there any router
  if (routers.length < 1) {
    return res.status(404).json({
      message: "No router found",
      success: false,
      routers,
    });
  }

  return res.status(200).json({ routers, success: true });
});

// Function to remove the router from the database
// Access Private
// Endpoint /net/api/router/delete/routerId
const deleteRouter = asyncHandler(async (req, res) => {
  return res.status(405).json({
    message: "Cannot remove a router once its created",
  });
});

// Function to update the router details
// Access Private
// Endpoint /net/api/router/update/routerId
const updateRouter = asyncHandler(async (req, res) => {
  // Get the id from the req
  const { id } = req.params;

  // Get the details from the req body
  const { rootUsername, rootPassword, vendorId, location } = req.body;

  // Check the length of the Id
  if (String(id).length !== 24) {
    return res
      .status(417)
      .json({ message: "Router Id format mismatching", success: false });
  }

  try {
    const foundRouter = await NetRouter.findById(id);

    if (!foundRouter) {
      return res
        .status(417)
        .json({ message: "No router found with the Id", success: false });
    }

    if (rootUsername) {
      foundRouter.rootUsername = rootUsername;
    }

    if (rootPassword) {
      // Hash the password
      const hashedRootPassword = bcrypt.hash(rootPassword);
      foundRouter.rootPassword = hashedRootPassword;
    }

    if (vendorId) {
      try {
        // check if the vendor is in existence
        const foundVendor = await NetVendor.findById(vendorId);

        if (!foundVendor) {
          return res
            .status(417)
            .json({ message: "No vendor found with the Id", success: false });
        }
      } catch (error) {
        return res
          .status(417)
          .json({ message: "No vendor found with the Id", success: false });
      }

      foundRouter.vendorId = vendorId;
    }

    if (location) {
      foundRouter.location = location;
    }

    // Save back the Router to the database
    await foundRouter.save();
  } catch (error) {
    console.log("🚀 ~ updateRouter ~ error:", error);
    return res
      .status(417)
      .json({ message: "No router found with the Id", success: false });
  }
  return res
    .status(202)
    .json({ success: true, message: "Router updated successfully" });
});

// Function to active or deactivate router
// Access Private
// Endpoint /net/api/router/toggle/routerId
const activateDeactivateRouter = asyncHandler(async (req, res) => {
  // Get the id from request params
  const { id } = req.params;

  const { status } = req.body;

  let originalRouter;

  // Check the length of the Id
  if (String(id).length !== 24) {
    return res
      .status(417)
      .json({ message: "Router Id format mismatching", success: false });
  }

  // Check the value of the status
  if (
    (status && !String(status).matchAll("active")) ||
    !String(status).matchAll("inactive")
  ) {
    return res.status(417).json({
      message: "Router cannot achieve that status" + status,
      success: false,
    });
  }

  try {
    const foundRouter = await NetRouter.findById(id).select("-rootPassword");

    if (!foundRouter) {
      return res
        .status(417)
        .json({ message: "No router found with the Id", success: false });
    }

    foundRouter.status = status || "active";
    originalRouter = foundRouter;

    await foundRouter.save();
  } catch (error) {
    return res
      .status(417)
      .json({ message: "No router found with the Id", success: false });
  }
  return res.status(200).json({
    message: "Router status updated successfully",
    success: true,
    router: { ...originalRouter._doc },
  });
});

// Function to add the sessions of the router
// Access Private
// Endpoint /net/api/router/routerId/sessions
const createRouterSessions = asyncHandler(async (req, res) => {
  return res.status(423).json({ message: "Api under development" });
});

// Function to get all sessions from a particular router
// Access Private
// Endpoint /net/api/router/routerId/sessions/list
const listRouterSessions = asyncHandler(async (req, res) => {
  // Find the id of the router
  const { id } = req.params;

  let data = [];

  // Check the length of the Id
  if (String(id).length !== 24) {
    return res
      .status(417)
      .json({ message: "Router Id format mismatching", success: false });
  }

  // Check if the Router exists with the provided Id
  try {
    const foundRouter = await NetRouter.findById(id).select("-rootPassword");

    if (!foundRouter) {
      return res
        .status(417)
        .json({ message: "No router found with the Id", success: false });
    }

    data = foundRouter.sessions;

    if (data.length < 1) {
      return res.status(417).json({
        message: "The router does not have any sessions",
        success: false,
      });
    }
  } catch (error) {
    return res
      .status(417)
      .json({ message: "No router found with the Id", success: false });
  }

  return res
    .status(200)
    .json({ message: "Found all the sessions", data, success: true });
});

export {
  createRouter,
  listRouter,
  listAllRouters,
  deleteRouter,
  updateRouter,
  activateDeactivateRouter,
  createRouterSessions,
  listRouterSessions,
};
