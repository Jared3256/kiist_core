import GetCurrentSession from "./session.get.js";
import CreateSession from "./session.create.js";
import SessionToggle from "./session.toggle.js";
import SessionDeadlineUpdate from "./session.deadline.update.js";
import SessionStudentReportOverride from "./session.student.admin.override.js";
import SessionOverrideList from "./session.override.list.js";

const createSessionMiddlewareController = () => {
    const methods = {}


    methods.get_semester = (req, res) => GetCurrentSession(req, res)
    methods.create_session = (req, res) => CreateSession(req, res)
    methods.toggle_session = (req, res) => SessionToggle(req, res)
    methods.deadline_update = (req, res) => SessionDeadlineUpdate(req, res)
    methods.session_admin_override = (req, res) => SessionStudentReportOverride(req, res)
    methods.session_admin_overrid_list = (req, res) => SessionOverrideList(req, res)
    return methods
}


export default createSessionMiddlewareController();