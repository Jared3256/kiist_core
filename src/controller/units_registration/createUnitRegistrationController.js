import RegisterUnit from "./register.js";
import ListStudentRegisteredUnits from "./student.unit.list.js";
import CancelUnitRegistration from "./cancel.js";

const cancelUnitRegistrationController = () => {
    const methods = {}

    methods.register = (req, res) => RegisterUnit(req, res)
    methods.student_list = (req, res) => ListStudentRegisteredUnits(req, res)
    methods.student_cancel = (req, res)=> CancelUnitRegistration(req, res)
    return methods
}

export default cancelUnitRegistrationController()