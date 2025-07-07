import UploadAdminFiles from "./admin.files.js";
import AdminStudentList from "./admin.student.list.js";
import AdminStudentRemove from "./admin.student.remove.js";
import SessionStudentListType from "../session/session.student.list.type.js";
import AdminStudentFinanceInformation from "./student/admin.student.finance.information.js";
import AdminStudentFinancePaymentHistory from "./student/admin.student.finance.payment.history.js";

const createAdminMiddleware = () => {
    const methods = {}
    methods.files = (req, res) => UploadAdminFiles(req, res)
    methods.student_list = (req, res) => AdminStudentList(req, res)
    methods.student_remove = (req, res) => AdminStudentRemove(req, res)

    /**
     * Student reporting history
     */
    methods.session_student_list = (req, res) => SessionStudentListType(req, res)

    /**
     * Student Finance Related
     */
    methods.student_finance_info = (req, res) => AdminStudentFinanceInformation(req, res)
    methods.student_finance_history = (req, res) => AdminStudentFinancePaymentHistory(req, res)
    return methods
}

export default createAdminMiddleware();