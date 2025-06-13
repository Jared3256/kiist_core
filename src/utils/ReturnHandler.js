const ReturnHandler = (message, success, data, code, res) => {

    return res.status(code).json({
        success: success,
        code: code,
        data: data
    })
}
export default ReturnHandler