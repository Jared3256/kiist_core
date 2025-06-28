import asyncHandler from "express-async-handler"
import JengaAuthorization from "./jenga.authorization.js";
import GenerateJengaSignature from "./geneateSignature.js";
import system_data from "../../../config/environment/env.constants.js";
import shortid from "shortid";
import axios from "axios";
import {format} from 'date-fns';
import studentProfileModel from "../../../models/student/student.js";
import StudentPaymentHistoryModel from "../../../models/student/student.payment.history.js";

const JengaStkpush = asyncHandler(async (req, res) => {

    const {amount, mobileNumber, id} = req.body;
    try {

        if (!amount || !mobileNumber || amount < 1 || !id || String(id).length !== 24) {
            return res.status(411).json({
                message: "required details are missing",
                success: false,
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

        const accessToken = await JengaAuthorization(req, res)
        const order_reference = String(shortid.generate() + shortid.generate()).toUpperCase()
        const payment_reference = String(shortid.generate() + shortid.generate()).toUpperCase()

        const message = `${order_reference}KES${mobileNumber}${amount}`

        const signature = await GenerateJengaSignature(message)

        const data = await axios.post(system_data.JENGA_DEV_STK_URL, {
            "order": {
                "orderReference": order_reference, //Order reference, should be unique per order
                "orderAmount": amount, //Origininal order amount
                "orderCurrency": "KES",
                "source": "APICHECKOUT",
                "countryCode": "KE",
                "description": "Purchase"
            },
            "customer": {
                "name": "John Doe",
                "email": "xyx2@gmail.com",
                "phoneNumber": "0722000111",
                "identityNumber": "0000000",
                "firstAddress": "",
                "secondAddress": ""
            },
            "payment": {
                "paymentReference": payment_reference, //Should be unique per request
                "paymentCurrency": "KES",
                "channel": "MOBILE",
                "service": "MPESA",
                "provider": "JENGA",
                "callBackUrl": "https://kiist-core-production.up.railway.app/api/v1/payment/j/back",
                "details": {
                    "msisdn": mobileNumber, //Number to push the stk
                    "paymentAmount": amount //Amount to pay on the request
                }
            },
        }, {
            headers: {
                "Signature": signature,
                "Content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if (data.data.status) {
            const result = await new StudentPaymentHistoryModel({
                student: id,
                receiptId: order_reference,
                amount: amount,
                payment: "Mpesa"
            }).save()

            if (!result) {
                return res.status(422).json({
                    message: "Unable to save payment details",
                    data: null, success: false
                })
            }
            return res.status(200).json({...data.data})
        }

    } catch (err) {
        console.log(err)

        return res.status(422).json({
            message: "Unable to initiate payment",
            success: false
        })
    }
})
export default JengaStkpush;