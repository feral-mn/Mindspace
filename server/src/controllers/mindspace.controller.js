import { Mindspace } from '../models/Mindspace.js';
import { Item } from '../models/Item.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Shared helper: load a mindspace and make sure the current user owns it.
export async function getOwnedMindspace(id, userId) {
  const mindspace = await Mindspace.findById(id);
  if (!mindspace) throw ApiError.notFound('Mindspace not found');
  if (!mindspace.owner.equals(userId)) throw ApiError.forbidden();
  return mindspace;
}

export const listMindspaces = asyncHandler(async (req, res) => {
  const mindspaces = await Mindspace.find({ owner: req.user._id }).sort({ updatedAt: -1 });
  res.json({ mindspaces });
});

export const createMindspace = asyncHandler(async (req, res) => {
  const mindspace = await Mindspace.create({ ...req.body, owner: req.user._id });
  res.status(201).json({ mindspace });
});

export const getMindspace = asyncHandler(async (req, res) => {
  const mindspace = await getOwnedMindspace(req.params.id, req.user._id);
  const items = await Item.find({ mindspace: mindspace._id }).sort({ createdAt: -1 });
  res.json({ mindspace, items });
});

export const updateMindspace = asyncHandler(async (req, res) => {
  const mindspace = await getOwnedMindspace(req.params.id, req.user._id);
  Object.assign(mindspace, req.body);
  await mindspace.save();
  res.json({ mindspace });
});

export const toggleShare = asyncHandler(async (req, res) => {
  const mindspace = await getOwnedMindspace(req.params.id, req.user._id);
  mindspace.isPublic = !mindspace.isPublic;
  await mindspace.save();
  res.json({ mindspace });
});

export const deleteMindspace = asyncHandler(async (req, res) => {
  const mindspace = await getOwnedMindspace(req.params.id, req.user._id);
  await Item.deleteMany({ mindspace: mindspace._id });
  await mindspace.deleteOne();
  res.status(204).end();
});
