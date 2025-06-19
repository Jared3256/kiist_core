import asyncHandler from "express-async-handler";
import axios from "axios";
import daraja_authorization from "./authorization.js";
import system_data from "../../config/environment/env.constants.js";
import StudentPaymentHistoryModel from "../../models/student/student.payment.history.js";
import studentProfileModel from "../../models/student/student.js";

const daraja_stkpush = asyncHandler(async (req, res) => {

    const {amount, phone, id} = req.body;

    try {
        console.log(req.body)


        if (!id || !amount || !phone || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid details received",
                success: false
            })
        }

        // Check if the Id represents a student
        const foundStudent = await studentProfileModel.findById(id)

        if (!foundStudent) {
            return res.status(417).json({
                message: "No student found",
                success: false
            })
        }


        const token = await daraja_authorization(req, res);

        const server_response = await axios.post(
            system_data.STKPUSH_URI,
            {
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwNjE5MTI1NTQw",
                "Timestamp": "20250619125540",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone,
                "PartyB": 174379,
                "PhoneNumber": phone,
                "CallBackURL": "https://kiist-core-production.up.railway.app/api/v1/payment/daraja_callback",
                "AccountReference": "Shan Software Systems",
                "TransactionDesc": "School Fee"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        console.log(server_response.data)

        const result = await new StudentPaymentHistoryModel({
            student: id,
            receiptId: server_response.data.MerchantRequestID,
            amount: amount,
            payment: "Mpesa"
        }).save()

        if (!result) {
            return res.status(422).json({
                message: "Unable to save payment details",
                data: null, success: false
            })
        }
        return res.status(200).json({
            data: "check your mpesa for confirmation of the payment",
        });
    } catch (e) {
        console.log(e)

        return res.status(422).json({
            message: "Unable to initiate payment",
            data: null,
            success: false
        })
    }


});

export default daraja_stkpush;
