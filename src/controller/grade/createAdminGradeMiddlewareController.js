import GradeList from "./grade.list.js";
import GradeCreate from "./grade.create.js";

const createAdminGradeMiddlewareController = () => {
    const methods = {}
    methods.list = (req, res) => GradeList(req, res)
    methods.create = (req, res) => GradeCreate(req, res)
    return methods
}

export default createAdminGradeMiddlewareController();