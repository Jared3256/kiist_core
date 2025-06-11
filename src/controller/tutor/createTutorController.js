import ListAllTutors from "./tutor.list.js";


const createTutorController = ()=>{
    const methods = {}
    methods.listTutors = (req, res) => ListAllTutors(req, res)
    return methods
}

export default createTutorController()