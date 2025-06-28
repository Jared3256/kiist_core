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
        const reference = String(shortid.generate() + shortid.generate()).toUpperCase()


        const message = `${system_data.JENGA_MERCHANT_ACCOUNT_NUMBER}${reference}${mobileNumber}Safaricom${amount}KES`

        const signature = await GenerateJengaSignature(message)

        const data = await axios.post(system_data.JENGA_DEV_STK_URL, {
            "merchant": {
                "accountNumber": system_data.JENGA_MERCHANT_ACCOUNT_NUMBER,
                "countryCode": "KE",
                "name": system_data.JENGA_MERCHANT_NAME
            },
            "payment": {
                "ref": reference,
                "amount": amount,
                "currency": "KES",
                "telco": "Safaricom",
                "mobileNumber": mobileNumber,
                "date": format(new Date(), "yyyy-MM-dd"),
                "callBackUrl": "https://kiist-core-production.up.railway.app/api/v1/payment/j/back",
                "pushType": "USSD"
            }
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
                receiptId: reference,
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

        return res.status(422).json({
            message: "Unable to initiate payment",
            success: false
        })
    }
})
export default JengaStkpush;