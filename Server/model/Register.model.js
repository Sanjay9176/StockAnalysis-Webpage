let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let  RegisterFormSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true,
        unique:true,
        match: /^[0-9]{10}$/
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    profileimage:{
        type:String
    }
});
let RegisterForm = mongoose.model('RegisterForm_Details',RegisterFormSchema);
module.exports = {RegisterForm}