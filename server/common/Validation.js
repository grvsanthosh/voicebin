export const validateEmail = function(email) {
    let re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return re.test(email)
};


export const validateMobile = function(mobile){
    let re = /\d{10}/
    return re.test(mobile);
}
