import ListAllTutors from "./tutor.list.js";
import CreateTutor from "./tutor.create.js";
import DeleteTutor from "./tutor.delete.js";
import AssignClasses from "./tutor.assign.class.js";


const createTutorController = () => {
    const methods = {}
    methods.listTutors = (req, res) => ListAllTutors(req, res)
    methods.create = (req, res) => CreateTutor(req, res)
    methods.remove = (req, res) => DeleteTutor(req, res)
    methods.assignClasses = (req, res) => AssignClasses(req, res)
    return methods
}

export default createTutorController()