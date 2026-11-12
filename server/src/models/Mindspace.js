import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const mindspaceSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, trim: true, maxlength: 300, default: '' },
    emoji: { type: String, default: '🧠' },
    isPublic: { type: Boolean, default: false },
    shareSlug: { type: String, unique: true, default: () => nanoid(10) },
    itemCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Mindspace = mongoose.model('Mindspace', mindspaceSchema);
