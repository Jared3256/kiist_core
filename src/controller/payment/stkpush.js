import asyncHandler from "express-async-handler";
import axios from "axios";
import daraja_authorization from "./authorization.js";
import system_data from "../../config/environment/env.constants.js";

const daraja_stkpush = asyncHandler(async (req, res) => {
  const token = await daraja_authorization(req, res);
  const server_response = await axios.post(
    system_data.STKPUSH_URI,
    {
      BusinessShortCode: system_data.SHORT_CODE,
      Password: system_data.PASSWORD,
      Timestamp: "20250525143138",
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: 254708374149,
      PartyB: 174379,
      PhoneNumber: 254746461910,
      CallBackURL: system_data.DEV_CALLBACK_URI,
      AccountReference: "Shan Dynamic System",
      TransactionDesc: "Payment of Tuition fee",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.status(200).json({
    data: "check your mpesa for confirmation of the payment",
  });
});

export default daraja_stkpush;
