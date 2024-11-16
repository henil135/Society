const bcrypt=require("bcryptjs")
exports.compare =async (Password,comparepassword) =>{
    return await bcrypt.compare(Password,comparepassword);
}