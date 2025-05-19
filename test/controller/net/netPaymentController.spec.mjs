import { expect } from "chai";
import {
  createPayment,
  deletePayment,
  listAllPayment,
  paymentSummary,
} from "../../../src/controller/net/netPaymentController.js";
import sinon from "sinon";

// Import the payment Model
import { NetPayment } from "../../../src/models/net/paymet.net.js";

// Import Vendor model
import { NetVendor } from "../../../src/models/net/vendor.net.js";

// Import the NetUser model
import { NetUser } from "../../../src/models/net/user.net.js";
import { NetSession } from "../../../src/models/net/session.net.js";

// List payment test
describe("List Payments Test", () => {
  afterEach(() => {
    sinon.restore();
  });

  // It should return 404 if there is no payment
  it("Should return 404 if no payments found", async () => {
    const fakePayments = [];

    sinon.stub(NetPayment, "find").resolves(fakePayments);
    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await listAllPayment(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "no payment found.",
      success: false,
    });
  });

  // it should return 200 if there are payments
  it("Should return 200 if there are payments", async () => {
    const fakePayments = [
      {
        id: "1",
        amount: "200",
      },
      {
        id: "2",
        amount: "200",
      },
    ];

    sinon.stub(NetPayment, "find").resolves(fakePayments);

    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await listAllPayment(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "payments found success",
      success: true,
      payments: fakePayments,
    });
  });
});

// Create Payment Test
describe("Create Payment Test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Should return 400 if userId is missing", async () => {
    const req = {
      body: {
        vendorId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b9818010a9",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(400)).to.be.true;
  });

  it("Should return 400 if  vendorId is missing", async () => {
    const req = {
      body: {
        userId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b9818010a9",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(400)).to.be.true;
  });

  it("Should return 400 if  sessionId  is missing", async () => {
    const req = {
      body: {
        vendorId: "670292d4f2059d6fe17d57db",
        userId: "670d5c85502389b9818010a9",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(400)).to.be.true;
  });

  it("Should return 400 if  amount is missing", async () => {
    const req = {
      body: {
        vendorId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b9818010a9",
        userId: "670d5c85502389b9818010a9",

        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(400)).to.be.true;
  });

  it("Should return 417 if userId length is not 24", async () => {
    const req = {
      body: {
        userId: "670292d4f2059d6fe17d57d",
        vendorId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b9818010a9",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(417)).to.be.true;
  });

  it("Should return 417 if  vendorId length is not 24", async () => {
    const req = {
      body: {
        userId: "670292d4f2059d6fe17d57dd",
        vendorId: "670292d4f2059d6fe17d57d",
        sessionId: "670d5c85502389b9818010a9",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(417)).to.be.true;
  });

  it("Should return 417 if  sessionId  is not 24", async () => {
    const req = {
      body: {
        userId: "670292d4f2059d6fe17d57dd",
        vendorId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b98180109",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(417)).to.be.true;
  });

  it("Should return 417 if user id does not match any user", async () => {
    const req = {
      body: {
        userId: "670292d4f2059d6fe17d57dd",
        vendorId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b98180109f",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    sinon.stub(NetUser, "findById").resolves();
    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(417)).to.be.true;
  });
  it("Should return 417 if vendor id does not match any vendor", async () => {
    const req = {
      body: {
        userId: "670292d4f2059d6fe17d57dd",
        vendorId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b98180109f",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    const Stub = {
      id: "1",
      name: "Jared ",
    };
    sinon.stub(NetUser, "findById").resolves(Stub);
    sinon.stub(NetVendor, "findById").resolves();
    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(417)).to.be.true;
  });
  it("Should return 417 if session id does not match any session", async () => {
    const req = {
      body: {
        userId: "670292d4f2059d6fe17d57dd",
        vendorId: "670292d4f2059d6fe17d57db",
        sessionId: "670d5c85502389b98180109f",
        amount: "50",
        paymentMethod: "BankTransfer",
        discountCode: "123456",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    const Stub = {
      id: "1",
      name: "Jared ",
    };
    sinon.stub(NetUser, "findById").resolves(Stub);
    sinon.stub(NetVendor, "findById").resolves(Stub);
    sinon.stub(NetSession, "findById").resolves();
    await createPayment(req, res);

    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status.calledWith(417)).to.be.true;
  });

  it("Should return 200 after creating payment without discount", async () => {
    const req = {
      body: {
        userId: "111111111111111111111111",
        vendorId: "111111111111111111111111",
        sessionId: "111111111111111111111111",
        amount: "50",
        paymentMethod: "BankTransfer",
      },
    };

    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    const paymentStub = {
      userId: "67029291f2059d6fe17d57d7",
      vendorId: "67029291f2059d6fe17d57d7",
      sessionId: "670d5c85502389b9818010a9",
      amount: "50",
      paymentMethod: "BankTransfer",
    };

    const Stub = {
      id: "1",
      name: "Jared",
      paymentHistory: [
        {
          id: "d",
        },
      ],

      save: () => {},
    };

    sinon.stub(NetUser, "findById").resolves(Stub);
    sinon.stub(NetVendor, "findById").resolves(Stub);
    sinon.stub(NetSession, "findById").resolves(Stub);
    sinon.stub(NetUser, "create").resolves(Stub);
    sinon.stub(NetPayment.prototype, "save").resolves(paymentStub);
    sinon.stub(NetUser.prototype, "save").resolves(Stub);
    sinon.stub(NetVendor.prototype, "save").resolves(Stub);

    await createPayment(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });
});

// Delete Peyment
describe("Delete Payment Test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Should return 405 when deleting payment", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };

    await deletePayment(req, res);

    expect(res.status.calledWith(405)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "cannot remove payment after posting",
      success: false,
    });
  });
});

// Payment Summary
describe("Payment Summary Test", () => {
  let res;
  let req;

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    req = {
      body: {
        id: "670292d4f2059d6fe17d57db",
      },
      params: {
        id: "670292d4f2059d6fe17d57db",
      },
    };

    res = {
      status: sinon.stub().returns({
        json: sinon.spy(),
      }),
      json: sinon.spy(),
    };
  });

  it("Should return 417 if vendor id length is 24", async () => {
    req = {
      params: {
        id: "670292d4f2059d6fe17dd",
      },
    };
    sinon.stub(NetVendor, "findById").resolves();
    await paymentSummary(req, res);

    expect(res.status.calledWith(417)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "vendor id format mismatching",
      success: false,
    });
  });
  it("Should return 417 if vendor is not valid", async () => {
    sinon.stub(NetVendor, "findById").resolves();
    await paymentSummary(req, res);

    expect(res.status.calledWith(417)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "invalid vendor id passed",
      success: false,
    });
  });

  it("Should return 417 if no payment is found", async () => {
    req = {
      params: {
        id: "670292d4f2059d6fe17d57db",
      },
    };

    const Stub = {
      id: "1",
      name: "Jared",
    };
    sinon.stub(NetVendor, "findById").resolves(Stub);
    sinon.stub(NetPayment, "find").resolves([]);

    await paymentSummary(req, res);

    expect(res.status.calledWith(417)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
    expect(res.status().json.firstCall.args[0]).to.deep.equal({
      message: "failed to match any payments to the vendor",
      success: false,
    });
  });

  it("Should return 200 after creating the summary", async () => {
    req = {
      params: {
        id: "670292d4f2059d6fe17d57db",
      },
    };

    const Stub = {
      id: "1",
      name: "Jared",
    };

    const paymentStub = [
      {
        id: "2",
        amount: "200",
        refunds: {
          amount: 1,
        },
        discountApplied: { amount: 1 },
      },
    ];
    sinon.stub(NetVendor, "findById").resolves(Stub);
    sinon.stub(NetPayment, "find").resolves(paymentStub);

    await paymentSummary(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledOnce).to.be.true;
  });
});

// Payment Filter
describe("Filter Payment Test", () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
     req = {
       body: {
         id: "670292d4f2059d6fe17d57db",
       },
       params: {
         id: "670292d4f2059d6fe17d57db",
       },
     };

     res = {
       status: sinon.stub().returns({
         json: sinon.spy(),
       }),
       json: sinon.spy(),
    };
    
  })


});
