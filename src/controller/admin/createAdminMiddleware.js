import UploadAdminFiles from "./admin.files.js";

const createAdminMiddleware = ()=>{
    const methods = {}
    methods.files =  (req, res)=>UploadAdminFiles(req, res)
    return methods
}

export default createAdminMiddleware();