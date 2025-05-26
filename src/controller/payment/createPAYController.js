import daraja_authorization from "./authorization.js";
import handlerDarajaCallback from "./callbackUrl.js";
import daraja_stkpush from "./stkpush.js";

const createPaymentController = () => {
  const methods = {};

  methods.authorization = (req, res) => daraja_authorization(req, res);
  methods.stkpush = (req, res) => daraja_stkpush(req, res);
  methods.callback = (req, res) => handlerDarajaCallback(req, res);
  return methods;
};

export default createPaymentController();
