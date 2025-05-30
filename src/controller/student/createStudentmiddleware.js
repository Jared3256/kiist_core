import RegisterNewStudent from "./register.first.js";
import UpdateStudentContact from "./student.contact.js";
import UpdateStudentAcademicBackground from "./academicBackground.js";
import UpdateStudentPaymentInfo from "./student.payment.js";
import submitStudentApplication from "./student.submit.js";


const createStudentMiddleware = () => {
    const methods = {}

    methods.register_new = (req, res) => RegisterNewStudent(req, res)
    methods.contact = (req, res) => UpdateStudentContact(req, res)
    methods.academic = (req, res) => UpdateStudentAcademicBackground(req, res)
    methods.payment = (req, res) => UpdateStudentPaymentInfo(req, res)
    methods.submit = (req, res) => submitStudentApplication(req, res)
    return methods;
}

export default createStudentMiddleware();