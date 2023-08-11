import { type Model, Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    otp_code: {
        type: String,
        required: false,
    },
    session_hash: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        required: true,
    },
})

export type User = Model<UserFields>;

export interface UserFields {
    email: string;
    password: string;
    otp_code: string;
    session_hash: string;
    lastLogin: Date;
};

export default (models.User ?? model('User', UserSchema)) as User; 
