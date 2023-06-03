import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 50,
        },
        email:{
          type:String,
          required: true,
          max: 50,
        },
        phoneNo:{
          type: "String",
          required: true,
        },
        employeeId: {
            type: String,
            min: 5,
        },
        designation: {
            type: String,
            min: 5,
        },  
        regNo: {
            type: String,
            min: 5,
        },
        semester: {
            type: String,
            min: 2,
            max: 50,
        },
        course: {
            type: String,
            min: 2,
            max: 50,
        },
        department: {
            type: String,
            min: 2,
            max: 50,
        },
        type: {
            type: String,
            enum: ["student", "faculty", "other"],
        },
        event: [
            {
                id: {
                    type: String,
                },
                name: {
                    type: String,
                },
            },
        ],
        status: {
            type: Boolean,
            default: "false",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
