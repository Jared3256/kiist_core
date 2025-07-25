import daraja_authorization from "./authorization.js";
import handlerDarajaCallback from "./callbackUrl.js";
import daraja_stkpush from "./stkpush.js";
import c2b_register_url from "./validation.js";
import JengaAuthorization from "./Jenga/jenga.authorization.js";
import JengaStkpush from "./Jenga/jenga.stkpush.js";
import JengaCallback from "./Jenga/jenga.callback.js";
import JengaCallbackIpn from "./Jenga/jenga.callback.ipn.js";

const createPaymentController = () => {
    const methods = {};

    methods.authorization = (req, res) => daraja_authorization(req, res);
    methods.stkpush = (req, res) => daraja_stkpush(req, res);
    methods.callback = (req, res) => handlerDarajaCallback(req, res);
    methods.validation = (req, res) => c2b_register_url(req, res);

    methods.jenga_authorize = (req, res) => JengaAuthorization(req, res)
    methods.jenga_stkpush = (req, res) => JengaStkpush(req, res);
    methods.jenga_callback = (req, res) => JengaCallback(req, res);
    methods.jenga_callback_ipn = (req, res) => JengaCallbackIpn(req, res)
    return methods;
};

export default createPaymentController();
