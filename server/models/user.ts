import mongoose, {Document, Model, Schema} from 'mongoose';

// Define interface for mongoose document (optional but recommended)
interface UserDoc extends Document {
    name: string;
    email: string;
    password: string;
    date: Date;
}

// Define mongoose schema
const UserSchema: Schema<UserDoc> = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

// Define and export mongoose model
const User: Model<UserDoc> = mongoose.model<UserDoc>('User', UserSchema);

export default User;
