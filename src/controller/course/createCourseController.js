import CreateCourse from "./course.create.js";
import ListAllCourseByDepartment from "./course.department.list.js";
import ListAllCourse from "./course.list.js";
import DeleteCourse from "./course.remove.js";
import UpdateCourse from "./course.update.js";
import CourseListByLecturer from "./course.lecturer.js";

const createCourseController = () => {
    const course_methods = {};

    course_methods.list = (req, res) => ListAllCourse(req, res);
    course_methods.list_by_department = (req, res) =>
        ListAllCourseByDepartment(req, res);
    course_methods.list_by_lecturer = (req, res) => CourseListByLecturer(req, res)
    course_methods.remove = (req, res) => DeleteCourse(req, res);
    course_methods.update = (req, res) => UpdateCourse(req, res);
    course_methods.create = (req, res) => CreateCourse(req, res);

    return course_methods;
};

export default createCourseController();
