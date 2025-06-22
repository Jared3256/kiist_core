import SessionStudentReport from "./session.student.report.js";
import SessionStudentGet from "./session.student.get.js";

const createReportingSessionController = () => {
    const methods = {}
    methods.report_session = (req, res) => SessionStudentReport(req, res)
    methods.session_get = (req, res) => SessionStudentGet(req, res)
    return methods;
}

export default createReportingSessionController();