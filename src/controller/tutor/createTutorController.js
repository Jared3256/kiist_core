import ListAllTutors from "./tutor.list.js";
import CreateTutor from "./tutor.create.js";


const createTutorController = ()=>{
    const methods = {}
    methods.listTutors = (req, res) => ListAllTutors(req, res)
    methods.create = (req, res)=> CreateTutor(req, res)
    return methods
}

export default createTutorController()