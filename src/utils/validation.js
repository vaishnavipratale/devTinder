const validator = require("validator");

const validateSignUpData =(req) =>{
    const { firstName, lastName, email, password}= req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not Valid!!");
    }else if(!validator.isEmail(email)){
        throw new Error("Email is not valid!!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

const validateEditProfileData = (req) =>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "email",
        "photoUrl",
        "gender",
        "age",
        "about",
        "Skills"
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
         allowedEditFields.includes(field)
);
return isEditAllowed;
};


module.exports = {
    validateSignUpData,
    validateEditProfileData,
};