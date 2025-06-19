import sinon from "sinon";
import { expect } from "chai";
import { NetVendorSubscription } from "../../../src/models/net/vendor.subscription.net.js";
import {
  listAllVendorSubscriptions,
  removeVendorSubscription,
} from "../../../src/controller/net/netVendorSubscriptionController.js";

// List all Vendor Subscriptions
describe("List Vendor Subscriptions Test", () => {
  afterEach(() => {
    sinon.restore();
  });

  // It should return 404 if there is no payment
  it("Should return 404 if no vendor Subscription found", async () => {
    const fakeData = [];

    sinon.stub(NetVendorSubscription, "find").resolves(fakeData);
    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await listAllVendorSubscriptions(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "no subscriptions found",
      success: false,
    });
  });

  // it should return 200 if there are payments
  it("Should return 200 if there are payments", async () => {
    const fakeVendorSubscriptions = [
      {
        id: "1",
        amount: "200",
      },
      {
        id: "2",
        amount: "200",
      },
    ];

    sinon.stub(NetVendorSubscription, "find").resolves(fakeVendorSubscriptions);

    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await listAllVendorSubscriptions(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "successfully found all subscriptions",
      success: true,
      subscriptions: fakeVendorSubscriptions,
    });
  });
});

// Remove Vendor  Subscription
describe("Remove Vendor subscription test", () => {
  afterEach(() => {
    sinon.restore();
  });

  // Remove vendor
  it("Should return 405 when attempting to delete vendor  subscription", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await removeVendorSubscription(req, res);

    expect(res.status.calledWith(405)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "cannot remove subscription after its created",
      success: false,
    });
  });
});

// Create Vendor subscription Test
describe("Create Vendor Subscription Test", () => {
  afterEach(() => {
    sinon.stub();
  });
});
