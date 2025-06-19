import daraja_authorization from "./authorization.js";
import handlerDarajaCallback from "./callbackUrl.js";
import daraja_stkpush from "./stkpush.js";
import c2b_register_url from "./validation.js";

const createPaymentController = () => {
    const methods = {};

    methods.authorization = (req, res) => daraja_authorization(req, res);
    methods.stkpush = (req, res) => daraja_stkpush(req, res);
    methods.callback = (req, res) => handlerDarajaCallback(req, res);
    methods.validation = (req, res) => c2b_register_url(req, res);
    return methods;
};

export default createPaymentController();
