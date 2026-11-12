import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    mindspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Mindspace', required: true, index: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true, trim: true },
    title: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    thumbnail: { type: String, default: '' },
    siteName: { type: String, default: '' },
    note: { type: String, trim: true, maxlength: 500, default: '' },
  },
  { timestamps: true }
);

export const Item = mongoose.model('Item', itemSchema);
