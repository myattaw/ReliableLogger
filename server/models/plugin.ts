import mongoose, {Document, Model, Schema} from 'mongoose';

// Define interface for mongoose document (optional but recommended)
interface PluginDoc extends Document {
    email: string;
    name: string;
    plugin: string;
    date: Date;
}

// Define mongoose schema
const PluginSchema: Schema<PluginDoc> = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    plugin: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now}
});

// Define and export mongoose model
const Plugin: Model<PluginDoc> = mongoose.model<PluginDoc>('Plugin', PluginSchema);

export default Plugin;
