import asyncHandler from "express-async-handler";
import axios from "axios";
import daraja_authorization from "./authorization.js";
import system_data from "../../config/environment/env.constants.js";
import StudentPaymentHistoryModel from "../../models/student/student.payment.history.js";
import studentProfileModel from "../../models/student/student.js";
import C2B_Register_url from "./register.completion.url.js";
import {isToday} from "date-fns";

const daraja_stkpush = asyncHandler(async (req, res) => {

    const {amount, phone, id} = req.body;

    try {
        const kenyanPhoneNumberRegex =
            /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8}|\+2547\d{8}|\+2541\d{8})$/;

        if (!kenyanPhoneNumberRegex.test(phone)) {
            return res.status(411).json({
                message: "Invalid details received",
                success: false
            })
        }

        if (!id || !amount || !phone || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid details received",
                success: false
            })
        }

        // create the date object and make sure it is tdy
        const my_date = new Date();

        if (!isToday(my_date)) {
            return res.status(422).json({
                message: "Unable to initiate Payment. Dates are mismatching, if problem persist, contact system administrator",
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
                "Password": String(system_data.PASSWORD),
                "Timestamp": String(system_data.TIMESTAMP),
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone,
                "PartyB": 174379,
                "PhoneNumber": phone,
                "CallBackURL": system_data.DEV_CALLBACK_URI,
                "AccountReference": `${foundStudent.registrationNumber} - ${foundStudent.personalDetails.firstname}`,
                "TransactionDesc": "Payment of School fee"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        const result = await new StudentPaymentHistoryModel({
            student: id,
            receiptId: server_response.data.MerchantRequestID,
            amount: amount,
            payment: "Mpesa",
            paymentDate: my_date
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
        console.log(e.response.data)
        return res.status(422).json({
            message: "Unable to initiate payment",
            data: null,
            success: false
        })
    }


});

export default daraja_stkpush;
