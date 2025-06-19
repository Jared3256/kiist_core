import UploadAdminFiles from "./admin.files.js";
import AdminStudentList from "./admin.student.list.js";
import AdminStudentRemove from "./admin.student.remove.js";

const createAdminMiddleware = () => {
    const methods = {}
    methods.files = (req, res) => UploadAdminFiles(req, res)
    methods.student_list = (req, res) => AdminStudentList(req, res)
    methods.student_remove = (req, res) => AdminStudentRemove(req, res)
    return methods
}

export default createAdminMiddleware();