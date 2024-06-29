import mongoose, {Document, Model, Schema} from 'mongoose';

// Define interface for mongoose document (optional but recommended)
interface UserDoc extends Document {
    email: string;
    plugin: string;
    date: Date;
}

// Define mongoose schema
const UserSchema: Schema<UserDoc> = new mongoose.Schema({
    email: {type: String, required: true},
    plugin: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now}
});

// Define and export mongoose model
const Plugin: Model<UserDoc> = mongoose.model<UserDoc>('Plugin', UserSchema);

export default Plugin;
