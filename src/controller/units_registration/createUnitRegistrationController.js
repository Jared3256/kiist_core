import RegisterUnit from "./register.js";
import ListStudentRegisteredUnits from "./student.unit.list.js";
import CancelUnitRegistration from "./cancel.js";
import AdminUnitList from "./admin.unit.list.js";
import ApproveUnitRegistration from "./approve.js";

const cancelUnitRegistrationController = () => {
    const methods = {}

    methods.register = (req, res) => RegisterUnit(req, res)
    methods.student_list = (req, res) => ListStudentRegisteredUnits(req, res)
    methods.student_cancel = (req, res) => CancelUnitRegistration(req, res)

    // Admin Only methods
    methods.admin_list = (req, res) => AdminUnitList(req, res)
    methods.admin_approve = (req,res) => ApproveUnitRegistration(req, res)


    return methods
}

export default cancelUnitRegistrationController()