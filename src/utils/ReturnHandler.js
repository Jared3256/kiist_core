const ReturnHandler =(message, success, data,code, res)=>{
    console.log(res, message, code, data)
    return res.status(code).json({
        success:success,
        code:code,
        data:data
    })
}
export default ReturnHandler