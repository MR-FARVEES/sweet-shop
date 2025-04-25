import mongoose, { Schema, Document } from 'mongoose'
import { UserProps } from '../interface/Users'

interface UserSchema extends UserProps, Document { }

const userSchema = new Schema<UserSchema>({
    firstName   : { type: String, required: true },
    lastName    : { type: String, required: true },
    username    : { type: String, required: true, unique: true },
    password    : { type: String, required: true },
    email       : { type: String, required: true, unique: true },
    businessName: { type: String, required: true },
    contact     : [{ type: String, unique: true }],
    address     : { type: String, required: true }
})

export const User = mongoose.model<UserSchema>('User', userSchema) || userSchema