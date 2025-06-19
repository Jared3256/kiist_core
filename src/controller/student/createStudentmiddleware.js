import RegisterNewStudent from "./register.first.js";
import UpdateStudentContact from "./student.contact.js";
import UpdateStudentAcademicBackground from "./academicBackground.js";
import UpdateStudentPaymentInfo from "./student.payment.js";
import submitStudentApplication from "./student.submit.js";
import UpdateStudentProgramSelection from "./student.program.js";
import UpdateStudentStatement from "./student.statement.js";
import UploadStudentFiles from "./student.files.js";

import {ReadStudentTranscript} from "./student.get.files.js";
import UpdateStudentDocumentInfo from "./student.documents.js";
import StudentFinanceGetInformation from "./finance/student.finance.getInformation.js";
import StudentFinancePaymentHistory from "./finance/student.finance.payment.history.js";

const createStudentMiddleware = () => {
    const methods = {};

    methods.register_new = (req, res) => RegisterNewStudent(req, res);
    methods.contact = (req, res) => UpdateStudentContact(req, res);
    methods.academic = (req, res) => UpdateStudentAcademicBackground(req, res);
    methods.payment = (req, res) => UpdateStudentPaymentInfo(req, res);
    methods.submit = (req, res) => submitStudentApplication(req, res);
    methods.program = (req, res) => UpdateStudentProgramSelection(req, res);
    methods.statement = (req, res) => UpdateStudentStatement(req, res);
    methods.files = (req, res) => UploadStudentFiles(req, res);
    methods.documents = (req, res) => UpdateStudentDocumentInfo(req, res);

    // Methods to read files from aws
    methods.read_high_school_transcript = (req, res) =>
        ReadStudentTranscript(req, res);

    // Finance related methods
    methods.finance_get_information = (req, res) => StudentFinanceGetInformation(req, res)
    methods.finance_get_payment_history = (req, res) => StudentFinancePaymentHistory(req, res)
    return methods;
};

export default createStudentMiddleware();
