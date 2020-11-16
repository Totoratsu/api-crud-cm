import { Schema, model, Document } from 'mongoose';

const validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} it\'s not a valid role'
};

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    role: { type: String, default: 'USER_ROLE', enum: validRoles, required: false }, 
},{
    timestamps: true
});

UserSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject
}

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    permissions: string;
    role: string;
}

export default model<IUser>('User', UserSchema);