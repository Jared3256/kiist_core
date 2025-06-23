import UploadAdminFiles from "./admin.files.js";
import AdminStudentList from "./admin.student.list.js";
import AdminStudentRemove from "./admin.student.remove.js";
import SessionStudentListType from "../session/session.student.list.type.js";

const createAdminMiddleware = () => {
    const methods = {}
    methods.files = (req, res) => UploadAdminFiles(req, res)
    methods.student_list = (req, res) => AdminStudentList(req, res)
    methods.student_remove = (req, res) => AdminStudentRemove(req, res)

    /**
     * Student reporting history
     */
    methods.session_student_list = (req, res) => SessionStudentListType(req, res)
    return methods
}

export default createAdminMiddleware();