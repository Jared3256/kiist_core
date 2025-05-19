import {NetVendor} from "../../models/net/vendor.net.js";
import asyncHandler from "express-async-handler";

// Function to create new Vendor
// Access Public
// Endpoint /net/api/vendor/create
const netCreateVendor = asyncHandler(async (req, res) => {
  // Get name, location from the request Body
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ message: "Critical Information missing" });
  }

  // Check if there is a vendor with the same name and location
  const foundVendor = await NetVendor.findOne({ name, location });

  if (foundVendor) {
    return res
      .status(409)
      .json({ message: `${name} is already registered in ${location}` });
  }

  const vendor = new NetVendor({
    name,
    location,
  });

  // save the vendor
  await vendor.save();

  return res
    .status(201)
    .json({ message: "Vendor registered success", ...vendor._doc });
});

// Function to delete Vendor
// Access Private
// Endpoint /net/api/vendor/delete/:vendorId
const netDeleteVendor = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  // Check if the Id length is 24
  if (String(vendorId).length !== 24) {
    return res.status(400).json({ message: "Invalid Id received" });
  }

  // find the vendor with the id passed
  const foundVendor = await NetVendor.findById(vendorId);

  if (!foundVendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  await NetVendor.findByIdAndDelete(vendorId);

  return res.status(201).json({ message: "Vendor removed success" });
});

// Function to get all vendors
// Access Private
// Endpoint /net/api/vendor/list
const netListVendors = asyncHandler(async (req, res) => {
  const vendors = await NetVendor.find();

  if (!vendors.length) {
    return res.status(404).json({ message: "No vendor found" });
  }

  return res.status(200).json(vendors);
});

// Function to get all vendors
// Access Private
// Endpoint /net/api/vendor/:vendorId/find
const netGetVendorById = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  // Check if the Id length is 24
  if (String(vendorId).length !== 24) {
    return res.status(400).json({ message: "Invalid Id received" });
  }

  // Find the vendor
  const vendor = await NetVendor.findById(vendorId);

  if (!vendor) {
    return res.status(404).json({ message: "Vendor does not exists" });
  }
  return res.status(200).json(vendor);
});

// Function to update the Vendor Information (name and location)
// Access Private
// Endpoint /net/api/vendor/:vendorId/update
const netUpdateVendor = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  // Check if the Id length is 24
  if (String(vendorId).length !== 24) {
    return res.status(400).json({ message: "Invalid Id received" });
  }

  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(204).json({ message: "Vendor information not Changed" });
  }

  const foundVendor = await NetVendor.findById(vendorId);

  if (!foundVendor) {
    return res
      .status(409)
      .json({ message: "Vendor id does not match anyone " });
  }

  foundVendor.name = name;
  foundVendor.location = location;

  await foundVendor.save();

  return res
    .status(200)
    .json({ message: "Vendor information updated successfully" });
});

// Function to update the pricing plan
// Access Private
// Endpoint /net/api/vendor/:vendorId/pricing_plan
const netPricingPlan = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;
  const { hourlyRate, dataRatePerMB } = req.body;

  // Check if the Id length is 24
  if (String(vendorId).length !== 24) {
    return res.status(400).json({ message: "Invalid Id received" });
  }

  const foundVendor = await NetVendor.findById(vendorId);

  if (!foundVendor) {
    return res
      .status(409)
      .json({ message: "Vendor id does not match anyone " });
  }

  if (!hourlyRate || !dataRatePerMB) {
    return res.status(204).json({ message: "Vendor information not Changed" });
  }

  foundVendor.pricingPlan = { hourlyRate, dataRatePerMB };

  await foundVendor.save();

  return res.status(200).json({
    message: "Pricing plan updated successfully",
    vendor: foundVendor._doc,
  });
});

// Function to update the Discounts
// Access Private
// Endpoints /net/api/vendor/:vendorId/discounts
const netDiscounts = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;
  const { code, type, value } = req.body;

  //  Check if the Id length is 24
  if (String(vendorId).length !== 24) {
    return res.status(400).json({ message: "Invalid Id received" });
  }

  const foundVendor = await NetVendor.findById(vendorId);

  if (!foundVendor) {
    return res
      .status(409)
      .json({ message: "Vendor id does not match anyone " });
  }

  if (!code || !type || !value) {
    return res.status(400).json({
      message: "Unable to create discounts. Include all information needed",
    });
  }
  foundVendor.discounts = [...foundVendor.discounts, { code, type, value }];

  await foundVendor.save();

  return res
    .status(200)
    .json({ message: "Discount added successfully", vendor: foundVendor });
});

export {
  netCreateVendor,
  netDeleteVendor,
  netListVendors,
  netGetVendorById,
  netUpdateVendor,
  netPricingPlan,
  netDiscounts,
};
