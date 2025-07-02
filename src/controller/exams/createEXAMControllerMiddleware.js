import CreateCat from "./cat/create.cat.js";
import ListCatByLecturer from "./cat/list.cat.by.lecturer.js";
import ListStudentCat from "./cat/list.student.cat.js";
import StudentSubmitCat from "./cat/student.submit.cat.js";
import ListCatByStudent from "./cat/list.cat.by.student.js";

const createEXAMControllerMiddleware = () => {
    const methods = {}

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     *
     * Tutor Specific methods
     */
    methods.create_cat = (req, res) => CreateCat(req, res);
    methods.list_cats_lecturer = (req, res) => ListCatByLecturer(req, res)

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     *
     * Student Specific methods
     */
    methods.student_list_cats = (req, res) => ListStudentCat(req, res)
    methods.student_submit_cat = (req, res) => StudentSubmitCat(req, res)
    methods.student_my_cats_list = (req, res) => ListCatByStudent(req, res)
    return methods
}

export default createEXAMControllerMiddleware();