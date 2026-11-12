import { Mindspace } from '../models/Mindspace.js';
import { Item } from '../models/Item.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Public, read-only view of a shared mindspace.
export const getSharedMindspace = asyncHandler(async (req, res) => {
  const mindspace = await Mindspace.findOne({ shareSlug: req.params.slug, isPublic: true })
    .populate('owner', 'name');
  if (!mindspace) throw ApiError.notFound('This mindspace is private or does not exist');

  const items = await Item.find({ mindspace: mindspace._id }).sort({ createdAt: -1 });
  res.json({
    mindspace: {
      name: mindspace.name,
      description: mindspace.description,
      emoji: mindspace.emoji,
      ownerName: mindspace.owner.name,
    },
    items,
  });
});
