import mongoose, {Document, Model, Schema} from 'mongoose';

// Define interface for mongoose document (optional but recommended)
interface PluginErrorDoc extends Document {
    plugin: string;
    message: string;
    date: Date;
}

// Define mongoose schema
const PluginErrorSchema: Schema<PluginErrorDoc> = new mongoose.Schema({
    plugin: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

// Define and export mongoose model
const Error: Model<PluginErrorDoc> = mongoose.model<PluginErrorDoc>('Error', PluginErrorSchema);

export default Error;
