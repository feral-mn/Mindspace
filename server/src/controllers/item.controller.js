import { Item } from '../models/Item.js';
import { Mindspace } from '../models/Mindspace.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getLinkPreview } from '../services/linkPreview.service.js';
import { getOwnedMindspace } from './mindspace.controller.js';

export const addItem = asyncHandler(async (req, res) => {
  const mindspace = await getOwnedMindspace(req.params.mindspaceId, req.user._id);
  const preview = await getLinkPreview(req.body.url);

  const item = await Item.create({
    mindspace: mindspace._id,
    owner: req.user._id,
    url: req.body.url,
    note: req.body.note || '',
    ...preview,
  });
  await Mindspace.updateOne({ _id: mindspace._id }, { $inc: { itemCount: 1 } });

  res.status(201).json({ item });
});

async function getOwnedItem(id, userId) {
  const item = await Item.findById(id);
  if (!item) throw ApiError.notFound('Item not found');
  if (!item.owner.equals(userId)) throw ApiError.forbidden();
  return item;
}

export const updateItem = asyncHandler(async (req, res) => {
  const item = await getOwnedItem(req.params.id, req.user._id);
  Object.assign(item, req.body);
  await item.save();
  res.json({ item });
});

export const deleteItem = asyncHandler(async (req, res) => {
  const item = await getOwnedItem(req.params.id, req.user._id);
  await item.deleteOne();
  await Mindspace.updateOne({ _id: item.mindspace }, { $inc: { itemCount: -1 } });
  res.status(204).end();
});
