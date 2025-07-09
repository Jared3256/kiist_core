import asyncHandler from "express-async-handler";
import StudentFinanceModel from "../../../models/student/student.finance.js";
import {sendStudentFeeReminder} from "../../../utils/mailtrap/email.js";
import studentProfileModel from "../../../models/student/student.js";
import converter from "number-to-words"

const AdminStudentFinanceReminderEmail = asyncHandler(async (req, res) => {
    const {id} = req.query

    try {

        console.log(id)
        if (!id || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid Id, send the correct student ID.",
                success: false
            })
        }

        // Find the student with the ID provided
        const studentUser = await studentProfileModel.findById(id)
        if (!studentUser) {
            return res.status(417).json({
                message: "Unable to find the student account.",
                success: false
            })
        }


        const foundStudent = await StudentFinanceModel.findOne({
            student: studentUser._id
        }).populate('student')

        console.log(foundStudent)
        if (!foundStudent) {
            return res.status(417).json({
                message: "Unable to find the student account.",
                success: false
            })
        }

        // send the email

        const email = foundStudent.student.contactAddress.email,
            name = foundStudent.student.personalDetails.firstname + " " + foundStudent.student.personalDetails.lastname,
            charged = foundStudent.total_fee,
            paid = foundStudent.amount_paid,
            balance = Number(foundStudent.total_fee) - Number(foundStudent.amount_paid),
            balance_text = converter.toWords(Number(foundStudent.total_fee) - Number(foundStudent.amount_paid))
        const result = await sendStudentFeeReminder(email, name, charged, paid, balance, balance_text)

        console.log(result)

        return res.status(200).json({
            message: "Student email reminder sent sucsess",
            success: true,
        })
    } catch (e) {
        console.log("Error sending email reminder", e)
        return res.status(422).json({
            message: "Unable to send the reminder email to the student. If problem persist, contact system admin",
            success: false,
        })
    }
})

export default AdminStudentFinanceReminderEmail