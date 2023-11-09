

const ErrorMessage = (errorMessage , status)=>{
    return {
        "message" : errorMessage,
        "error" : status
    }
}

module.exports = {ErrorMessage}