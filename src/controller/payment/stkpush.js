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

/**
 * 
let unirest = require('unirest');
let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
.headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer venyyHwAo2XUGCNolW8Urf4nmfL0'
})
.send(JSON.stringify({
    "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwNTI1MTQzMTM4",
    "Timestamp": "20250525143138",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254708374149,
    "PartyB": 174379,
    "PhoneNumber": 254708374149,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X" 
  }))
.end(res => {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
});
 */
