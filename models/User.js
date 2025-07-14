const mongoose = require("mongoose");

const userSchema = new mongoose.Schema (
    {
        name: { type:String, rquire:[true, "Name is required"]},
        email: { type:String, require:[true, "Email is required"], unique:true, lowercase:true },
        password: { type:String, require:[true, "Password is required"], minlength:6 },
        role: { type:String, enum:["user", "admin"], default:"user" },
        isActive: { type:Boolean, default:true }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("User", userSchema);