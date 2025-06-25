import GradeList from "./grade.list.js";
import GradeCreate from "./grade.create.js";
import GradeEdit from "./grade.edit.js";
import GradeStudentGetByRegistration from "./grade.student.get_by_registration.js";

const createAdminGradeMiddlewareController = () => {
    const methods = {}
    methods.list = (req, res) => GradeList(req, res)
    methods.create = (req, res) => GradeCreate(req, res)
    methods.edit = (req, res) => GradeEdit(req, res)
    methods.student_get = (req, res) => GradeStudentGetByRegistration(req, res)
    return methods
}

export default createAdminGradeMiddlewareController();